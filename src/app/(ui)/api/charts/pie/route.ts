import { NextRequest, NextResponse } from "next/server";
const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ]

export async function GET(req: NextRequest) {
    try {
        if (!chartData || !Array.isArray(chartData)) {
            throw new Error("Invalid chart data");
        }

        return new NextResponse(JSON.stringify({
            success: true,
            data: chartData,
            message: "Pie chart data retrieved successfully"
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("[API] Pie Chart Error:", error);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Failed to fetch pie chart data",
            error: error instanceof Error ? error.message : "Unknown error occurred"
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}