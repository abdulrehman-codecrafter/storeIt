"use client";

import { useState, useEffect } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useFilesContext } from "@/contexts/filesContext";

const MAX_FILES = 50; // Total limit

export default function Chart() {
    const [mounted, setMounted] = useState(false);
    const { files, filesLoading } = useFilesContext();
    const fileCount = files?.length ?? 0;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Prevents hydration mismatch

    const chartData = [
        { value: Math.min(fileCount, MAX_FILES), fill: "#FFFFFF" },
    ];

    return (
        <Card className="flex flex-col bg-brand border-none rounded-3xl p-4">
            <CardContent className="flex items-center justify-evenly">
                <div className="relative w-44 h-44 flex items-center justify-center">
                    <RadialBarChart
                        width={200}
                        height={200}
                        cx="50%"
                        cy="50%"
                        innerRadius="80%"
                        outerRadius="100%"
                        barSize={18}
                        data={chartData}
                        startAngle={235}
                        endAngle={-55}
                    >
                        <PolarAngleAxis
                            type="number"
                            domain={[0, MAX_FILES]}
                            angleAxisId={0}
                            tick={false}
                        />
                        <RadialBar
                            background={{ fill: "rgba(255, 255, 255, 0.3)" }}
                            dataKey="value"
                            cornerRadius={50}
                        />
                    </RadialBarChart>

                    {/* Centered Percentage & Label */}
                    <div className="absolute flex flex-col items-center text-white">
                        <span className="text-3xl font-bold">
                            {filesLoading ? (
                                <>
                                    
                                    <div
                                        role="status"
                                        className="max-w-sm relative overflow-hidden rounded-md"
                                    >
                                        <div className="h-6 bg-[#fc9d9f] rounded-md w-14 mb-1.5 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#ff9c9d] via-[#fdb6b8] to-[#fc9d9f] animate-[shimmer_1.5s_infinite]"></div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                fileCount
                            )}
                        </span>
                        <span className="text-sm">Total Files</span>
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        {" "}
                        Limit
                    </h1>

                    <p className="text-white">50 uploads</p>
                </div>
            </CardContent>
        </Card>
    );
}
