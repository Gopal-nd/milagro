import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ComponentDetailContent } from "@/components/component-detail-content"
import { COMPONENTS } from "@/lib/seed-data"
import { notFound } from "next/navigation"

interface ComponentPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return COMPONENTS.map((component) => ({
    slug: component.slug,
  }))
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params
  const component = COMPONENTS.find((c) => c.slug === slug)

  if (!component) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <ComponentDetailContent component={component} />
      </section>

      <Footer />
    </main>
  )
}
