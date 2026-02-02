"use client"

import { useMemo } from 'react'

interface Edge {
    x1: number
    y1: number
    x2: number
    y2: number
    layer: number
    isCompromised: boolean
}

// Generate a complex network with layered depth
function generateComplexNetwork() {
    const edges: Edge[] = []

    const clusters = [
        { cx: 80, cy: 120, count: 15, spread: 60 },
        { cx: 120, cy: 250, count: 18, spread: 70 },
        { cx: 60, cy: 380, count: 12, spread: 55 },
        { cx: 150, cy: 450, count: 10, spread: 50 },
        { cx: 180, cy: 180, count: 14, spread: 65 },
        { cx: 220, cy: 130, count: 12, spread: 55 },
        { cx: 250, cy: 300, count: 16, spread: 60 },
        { cx: 200, cy: 380, count: 14, spread: 55 },
        { cx: 300, cy: 200, count: 20, spread: 70 },
        { cx: 320, cy: 320, count: 18, spread: 65 },
        { cx: 280, cy: 420, count: 15, spread: 60 },
        { cx: 350, cy: 150, count: 12, spread: 50 },
        { cx: 400, cy: 250, count: 16, spread: 60 },
        { cx: 380, cy: 380, count: 14, spread: 55 },
        { cx: 420, cy: 120, count: 10, spread: 45 },
        { cx: 480, cy: 180, count: 14, spread: 55 },
        { cx: 520, cy: 300, count: 16, spread: 60 },
        { cx: 500, cy: 420, count: 12, spread: 50 },
        { cx: 550, cy: 220, count: 10, spread: 45 },
        { cx: 540, cy: 380, count: 8, spread: 40 },
    ]

    let seed = 42
    const seededRandom = () => {
        seed = (seed * 9301 + 49297) % 233280
        return seed / 233280
    }

    const nodes: { x: number; y: number }[] = []
    clusters.forEach(cluster => {
        for (let i = 0; i < cluster.count; i++) {
            const angle = seededRandom() * Math.PI * 2
            const distance = seededRandom() * cluster.spread
            nodes.push({
                x: Math.max(20, Math.min(580, cluster.cx + Math.cos(angle) * distance)),
                y: Math.max(20, Math.min(530, cluster.cy + Math.sin(angle) * distance))
            })
        }
    })

    // Count connections per node to find a highly connected one
    const connectionCount: number[] = new Array(nodes.length).fill(0)
    const tempEdges: { i: number; j: number; layer: number }[] = []

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x
            const dy = nodes[j].y - nodes[i].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            const connectionThreshold = 80 + seededRandom() * 30
            if (distance < connectionThreshold && seededRandom() > 0.4) {
                let layer: number
                if (distance > 65) layer = 0
                else if (distance > 52) layer = 1
                else if (distance > 40) layer = 2
                else if (distance > 28) layer = 3
                else layer = 4

                tempEdges.push({ i, j, layer })
                connectionCount[i]++
                connectionCount[j]++
            }
        }
    }

    // Find the node with THE MOST connections - absolute highest
    let maxConnections = 0
    let attackerNodeIndex = 0
    for (let i = 0; i < connectionCount.length; i++) {
        if (connectionCount[i] > maxConnections) {
            maxConnections = connectionCount[i]
            attackerNodeIndex = i
        }
    }

    const attackerNode = nodes[attackerNodeIndex]

    // Find all neighbors of the attacker (nodes directly connected)
    const attackerNeighbors = new Set<number>()
    for (const te of tempEdges) {
        if (te.i === attackerNodeIndex) attackerNeighbors.add(te.j)
        if (te.j === attackerNodeIndex) attackerNeighbors.add(te.i)
    }

    // Now create edges - mark as compromised if connected to attacker OR between attacker's neighbors
    for (const te of tempEdges) {
        // Primary: directly connected to attacker
        const directConnection = te.i === attackerNodeIndex || te.j === attackerNodeIndex
        // Secondary: edge between two of attacker's neighbors (creates cluster effect)
        const neighborConnection = attackerNeighbors.has(te.i) && attackerNeighbors.has(te.j)

        const isCompromised = directConnection || neighborConnection
        edges.push({
            x1: nodes[te.i].x,
            y1: nodes[te.i].y,
            x2: nodes[te.j].x,
            y2: nodes[te.j].y,
            layer: te.layer,
            isCompromised
        })
    }

    // Add long-range connections (never compromised since they're layer 0)
    for (let i = 0; i < 40; i++) {
        const idx1 = Math.floor(seededRandom() * nodes.length)
        const idx2 = Math.floor(seededRandom() * nodes.length)
        if (idx1 !== idx2) {
            edges.push({
                x1: nodes[idx1].x,
                y1: nodes[idx1].y,
                x2: nodes[idx2].x,
                y2: nodes[idx2].y,
                layer: 0,
                isCompromised: false
            })
        }
    }

    edges.sort((a, b) => a.layer - b.layer)
    return { edges, attackerNode }
}

// 5 layer styles - smooth gradient from light to dark
const layerStyles = [
    { opacity: 0.18, strokeWidth: 0.35 },
    { opacity: 0.24, strokeWidth: 0.45 },
    { opacity: 0.30, strokeWidth: 0.55 },
    { opacity: 0.38, strokeWidth: 0.7 },
    { opacity: 0.50, strokeWidth: 0.9 },
]

export function HeroVisual() {
    const { edges, attackerNode } = useMemo(() => generateComplexNetwork(), [])

    return (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[650px] h-[620px] pointer-events-none hidden lg:block -mr-12">
            <svg viewBox="0 0 600 550" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">

                {/* Render all 5 layers - green/grey or red based on compromise and theme */}
                {[0, 1, 2, 3, 4].map(layer => (
                    <g key={`layer-${layer}`}>
                        {edges.filter(e => e.layer === layer).map((edge, i) => (
                            <line
                                key={`edge-${layer}-${i}`}
                                x1={edge.x1}
                                y1={edge.y1}
                                x2={edge.x2}
                                y2={edge.y2}
                                className={edge.isCompromised 
                                    ? "stroke-[#ff4444]" 
                                    : "dark:stroke-[#33E092] stroke-zinc-500"
                                }
                                strokeWidth={layerStyles[layer].strokeWidth}
                                opacity={edge.isCompromised ? layerStyles[layer].opacity + 0.15 : layerStyles[layer].opacity}
                            />
                        ))}
                    </g>
                ))}

                {/* Small subtle red dot at the node joint */}
                <circle cx={attackerNode.x} cy={attackerNode.y} r="2" fill="#ff4444" opacity="0.4" />

                {/* Data packets - green in dark, grey in light */}
                <g>
                    <circle r="2" className="dark:fill-[#33E092] fill-zinc-600" opacity="0.8">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M60,150 L120,200 L180,180 L220,250" />
                    </circle>
                    <circle r="2" className="dark:fill-[#33E092] fill-zinc-600" opacity="0.75">
                        <animateMotion dur="3.5s" repeatCount="indefinite" path="M100,350 L150,320 L200,350 L250,300" begin="0.5s" />
                    </circle>
                    <circle r="2" className="dark:fill-[#33E092] fill-zinc-600" opacity="0.8">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M450,180 L500,220 L530,200 L560,250" />
                    </circle>
                    <circle r="2" className="dark:fill-[#33E092] fill-zinc-600" opacity="0.75">
                        <animateMotion dur="6s" repeatCount="indefinite" path="M80,200 L180,250 L250,280" />
                    </circle>
                    <circle r="2" className="dark:fill-[#33E092] fill-zinc-600" opacity="0.7">
                        <animateMotion dur="5s" repeatCount="indefinite" path="M480,350 L520,320 L550,380" begin="1s" />
                    </circle>
                </g>
            </svg>
        </div>
    )
}

export default HeroVisual
