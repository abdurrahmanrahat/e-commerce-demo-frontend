import Banner from "@/components/common/Banner";
import Container from "@/components/shared/Ui/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide premium tech products that enhance productivity and creativity for professionals worldwide.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "We prioritize customer satisfaction with exceptional service, quality products, and reliable support.",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description:
        "Every product is carefully selected and tested to meet our high standards of excellence.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description:
        "We stay ahead of technology trends to bring you the latest and most innovative products.",
    },
  ];

  return (
    <Container className="py-8">
      <Banner
        bgImage="/images/banners/about-page-banner.jpg"
        title="About"
        description="Gadgetoria offers smart, affordable, innovative gadgets that simplify and enhance everyday life."
        breadcrumbs={[{ label: "About", href: "/about" }]}
      />

      <main className="py-16">
        {/* Company Story */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Founded in 2020, Gadgetoria emerged from a simple vision: to make
              premium technology accessible to everyone. What started as a small
              online store has grown into a trusted destination for tech
              enthusiasts, professionals, and everyday users seeking quality
              gadgets and accessories.
            </p>
            <p>
              We understand that technology isn&apos;t just about
              specifications—it&apos;s about enhancing your daily life, boosting
              productivity, and enabling creativity. That&apos;s why we
              carefully curate every product in our catalog, ensuring it meets
              our rigorous standards for quality, functionality, and value.
            </p>
            <p>
              Today, Gadgetoria serves thousands of satisfied customers across
              the globe, offering everything from cutting-edge laptops and
              keyboards to innovative accessories and smart devices. Our
              commitment to excellence, combined with exceptional customer
              service, has made us a leader in the tech retail space.
            </p>
          </div>
        </section>

        {/* Values Grid */}
        <section className="mb-16">
          {/* <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Our Values
          </h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <Card key={value.title} className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="pt-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Explore?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Discover our curated collection of premium tech products and find
            the perfect gadgets to enhance your digital lifestyle.
          </p>
          <Link href="/shop">
            <Button size="lg">Browse Products</Button>
          </Link>
        </section>
      </main>
    </Container>
  );
};

export default About;
