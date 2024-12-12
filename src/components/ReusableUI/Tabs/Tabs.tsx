"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { TabsProps, TabField } from "@/types/tabs.types"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function ReusableTabs({ config, className }: TabsProps) {
    const renderField = (field: TabField, index: number) => (
        <motion.div
            key={field.id}
            {...config.styles?.motionVariants?.field}
            transition={{
                ...config.styles?.motionVariants?.field?.transition,
                delay: index * 0.1
            }}
            className={cn(config.styles?.field)}
        >
            <Label
                htmlFor={field.id}
                className={cn(config.styles?.label)}
            >
                {field.label}
            </Label>
            <Input
                id={field.id}
                type={field.type}
                defaultValue={field.defaultValue}
                placeholder={field.placeholder}
                required={field.required}
                className={cn(config.styles?.input)}
            />
        </motion.div>
    );

    return (
        <motion.div
            {...config.styles?.motionVariants?.container}
            className={cn(config.styles?.container, className)}
        >
            <Tabs defaultValue={config.defaultValue} className={cn(config.width, config.styles?.tabs)}>
                <TabsList>
                    <AnimatePresence mode="wait">
                        {config.tabs.map((tab) => (
                            <motion.div
                                key={tab.value}
                                {...config.styles?.motionVariants?.tab}
                            >
                                <TabsTrigger
                                    value={tab.value}
                                    className={cn(config.styles?.trigger)}
                                >
                                    {tab.title}
                                </TabsTrigger>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </TabsList>

                <div className="h-[500px] overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {config.tabs.map((tab) => (
                            <TabsContent key={tab.value} value={tab.value}>
                                <motion.div {...config.styles?.motionVariants?.content}>
                                    <Card className={cn(config.styles?.card)}>
                                        {tab.content.header && (
                                            <motion.div {...config.styles?.motionVariants?.header}>
                                                <CardHeader className={cn(config.styles?.cardHeader)}>
                                                    {tab.content.header.title && (
                                                        <CardTitle className={cn(config.styles?.cardTitle)}>
                                                            {tab.content.header.title}
                                                        </CardTitle>
                                                    )}
                                                    {tab.content.header.description && (
                                                        <CardDescription className={cn(config.styles?.cardDescription)}>
                                                            {tab.content.header.description}
                                                        </CardDescription>
                                                    )}
                                                </CardHeader>
                                            </motion.div>
                                        )}

                                        {tab.content.fields && (
                                            <CardContent className={cn(config.styles?.cardContent)}>
                                                {tab.content.fields.map((field, index) =>
                                                    renderField(field, index)
                                                )}
                                            </CardContent>
                                        )}

                                        {tab.content.footer?.buttons && (
                                            <motion.div {...config.styles?.motionVariants?.footer}>
                                                <CardFooter className={cn(config.styles?.cardFooter)}>
                                                    {tab.content.footer.buttons.map((button, index) => (
                                                        <Button
                                                            key={index}
                                                            variant={button.variant}
                                                            onClick={button.onClick}
                                                            className={cn(config.styles?.button)}
                                                        >
                                                            {button.label}
                                                        </Button>
                                                    ))}
                                                </CardFooter>
                                            </motion.div>
                                        )}
                                    </Card>
                                </motion.div>
                            </TabsContent>
                        ))}
                    </AnimatePresence>
                </div>
            </Tabs>
        </motion.div>
    );
}
