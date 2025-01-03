'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Layers, Paintbrush, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Home() {
  const features = [
    { icon: Layers, title: "Multiple Project Types", description: "Build web, mobile, or desktop apps with ease." },
    { icon: Paintbrush, title: "Customizable Designs", description: "Tailor the look and feel to match your brand." },
    { icon: Zap, title: "Rapid Development", description: "Accelerate your workflow with our intuitive tools." },
  ]

  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <motion.h1
          className="text-4xl md:text-5xl mb-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <strong>IBR Infotech / </strong> Atomic UI
        </motion.h1>

        <motion.p
          className="text-xl mb-8 text-muted-foreground text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Empower your creativity with our advanced project builder.
          Design, develop, and deploy your ideas faster than ever before.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <Button asChild size="lg">
            <Link href="/sign-in" className="inline-flex items-center">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <feature.icon className="h-5 w-5" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

