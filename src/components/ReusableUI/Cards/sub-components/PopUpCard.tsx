'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CardConfig } from "@/types/card.types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

interface PopUpCardProps {
    isOpen: boolean;
    onClose: () => void;
    config: CardConfig;
}

export function PopUpCard({ isOpen, onClose, config }: PopUpCardProps) {
    const { title, amount, percentageChange, data, config: cardConfig } = config;

    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[600px] w-full p-0 overflow-hidden">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 p-6 pt-2">
                        {/* Amount and Change Section */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-3xl font-bold">{formattedAmount}</p>
                                <div
                                    className={`text-sm mt-1 ${
                                        percentageChange >= 0 ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                    {percentageChange >= 0 ? "+" : ""}
                                    {percentageChange.toFixed(1)}% from last month
                                </div>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                                    <XAxis />
                                    <YAxis />
                                    <Tooltip 
                                        formatter={(value) => [`${value}`, 'Value']}
                                        labelFormatter={(label) => `Point ${label + 1}`}
                                    />
                                    <Line
                                        type={cardConfig.chartConfig.type}
                                        dataKey="value"
                                        stroke={cardConfig.chartConfig.stroke}
                                        strokeWidth={cardConfig.chartConfig.strokeWidth}
                                        dot={{ r: cardConfig.chartConfig.dotRadius }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Additional Details Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg"
                        >
                            <div>
                                <h3 className="font-medium text-sm text-slate-500">Average Value</h3>
                                <p className="mt-1 font-semibold">
                                    {(data.reduce((acc, curr) => acc + curr.value, 0) / data.length).toFixed(2)}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium text-sm text-slate-500">Highest Value</h3>
                                <p className="mt-1 font-semibold">
                                    {Math.max(...data.map(d => d.value))}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium text-sm text-slate-500">Lowest Value</h3>
                                <p className="mt-1 font-semibold">
                                    {Math.min(...data.map(d => d.value))}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium text-sm text-slate-500">Total Points</h3>
                                <p className="mt-1 font-semibold">{data.length}</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
