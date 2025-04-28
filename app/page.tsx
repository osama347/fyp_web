"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Compare } from "@/components/ui/compare";
import { motion } from "framer-motion";
import { Camera, Shirt, ShoppingCart, Zap, Smile, Code, Mail, MessageCircle, Heart,Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AnimatedTestimonialsDemo } from "@/components/Testimonial";
import { ArrowRight, RefreshCw, Check, X } from "lucide-react";
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";

export default function Home() {
  const steps = [
    { icon: <Camera size={50} className="text-primary" />, title: "Upload Your Photo", desc: "Take a picture or upload an existing one." },
    { icon: <Shirt size={50} className="text-primary" />, title: "Select Clothing", desc: "Pick your favorite styles from our collection." },
    { icon: <ShoppingCart size={50} className="text-primary" />, title: "Try & Purchase", desc: "See the fit and order with confidence." },
  ];

  const users = [
    {
      name: "Fashion Retailers",
      img: "/images/retailor.jpg",
      desc: "Reduce return rates and increase conversions by letting customers visualize outfits before purchasing.",
    },
    {
      name: "Fashion Designers",
      img: "/images/designer.jpg",
      desc: "Digitally test and refine designs before production, cutting costs and improving efficiency.",
    },
    {
      name: "E-commerce Stores",
      img: "/images/ecommerce.jpg",
      desc: "Boost engagement and customer confidence with a virtual fitting room, increasing sales.",
    },
    {
      name: "Consumers",
      img: "/images/consumer.jpg",
      desc: "No more guessing! Try outfits virtually, ensuring perfect fit and style before you buy.",
    },
  ];

  const features = [
    { icon: <Check size={40} className="text-primary" />, title: "Accurate Fit", desc: "AI-powered garment placement for realistic results." },
    { icon: <Zap size={40} className="text-primary" />, title: "Instant Rendering", desc: "See your outfit in seconds with no delays." },
    { icon: <Smile size={40} className="text-primary" />, title: "User-Friendly", desc: "Simple and intuitive interface for all users." },
  ];

  const testimonials = [
    {
      name: "Sarah L.",
      role: "Fashion Influencer",
      quote: "This app has completely changed how I shop online. I can try outfits virtually and know exactly what works for me!",
      img: "/images/testimonial1.jpg",
    },
    {
      name: "John D.",
      role: "E-commerce Store Owner",
      quote: "Integrating virtual try-on boosted our sales by 30%. Customers love the confidence it gives them!",
      img: "/images/testimonial2.jpg",
    },
  ];

  const faqs = [
    { question: "How accurate is the virtual try-on?", answer: "Our AI ensures high accuracy in garment placement and fit." },
    { question: "Can I use this on my e-commerce site?", answer: "Yes, we offer seamless integration for online stores." },
    { question: "Is my data safe?", answer: "We prioritize user privacy and comply with all data protection regulations." },
  ];

  return (
    <div className="">
      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between min-h-screen px-6 sm:px-12 lg:px-20 py-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl text-left"
        >
          <h1 className="text-5xl font-extrabold leading-tight">
            THE WORLD’S MOST ADVANCED <br />
            <span className="text-primary">VIRTUAL TRY-ON TECHNOLOGY</span>
          </h1>
          <p className="text-lg mt-6 text-muted-foreground">
            Experience the future of fashion with our cutting-edge, AI-powered virtual try-on solution. Instantly visualize your outfits in 3D, customize designs effortlessly, and achieve the perfect fit—all in seconds.
          </p>
          <div className="mt-8 flex space-x-6">
            <Button className="px-6 py-3 text-lg font-semibold shadow-md">Get Started</Button>
            <Button variant="outline" className="px-6 py-3 text-lg">Learn More</Button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 md:mt-0"
        >
          <Image
            src="/images/hero-image.png" // Replace with your image
            alt="Virtual Mirror"
            width={500}
            height={300}
            className="rounded-lg"
            />
          </motion.div>
          </section>

          {/* Problem Section
          <section className="py-20 px-6 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
            >
            <h2 className="text-4xl font-bold">The Online Shopping Dilemma</h2>
            <p className="mt-4 text-xl text-muted-foreground">
              40% of online clothing purchases are returned due to poor fit
            </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
              <div className="bg-destructive/10 p-3 rounded-full">
                <ShoppingCart className="text-destructive h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Uncertain Purchases</h3>
                <p className="text-muted-foreground">Customers can't try before they buy, leading to hesitation and abandoned carts</p>
              </div>
              </div>
              
              <div className="flex items-start space-x-4">
              <div className="bg-destructive/10 p-3 rounded-full">
                <Shirt className="text-destructive h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Size Mismatches</h3>
                <p className="text-muted-foreground">Different brands have different sizing standards, making it hard to find the right fit</p>
              </div>
              </div>

              <div className="flex items-start space-x-4">
              <div className="bg-destructive/10 p-3 rounded-full">
                <Mail className="text-destructive h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">High Return Rates</h3>
                <p className="text-muted-foreground">Retailers lose billions annually due to returns and shipping costs</p>
              </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative">
              <Image
                src="/images/before-after.png"
                alt="Before and After Virtual Try-On"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg">
                <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold">Transform your shopping experience</p>
                <p className="text-sm">Try before you buy with virtual fitting room</p>
                </div>
              </div>
              </div>
            </motion.div>
            </div>
          </div>
</section> */}
<section className="py-20 px-6 sm:px-12 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold">
            Shopping Online Feels Like a Gamble
          </h2>
          <p className="text-lg text-muted-foreground">
            Without the ability to try on clothes, you’re left guessing about fit, style, and how an outfit will truly look on you. The result? Frustration, costly returns, and wasted time.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <RefreshCw size={24} className="text-destructive" />
              <p className="text-lg text-muted-foreground">
                High return rates due to poor fit and style mismatches.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <X size={24} className="text-destructive" />
              <p className="text-lg text-muted-foreground">
                Disappointment when outfits don’t look as expected.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Check size={24} className="text-primary" />
              <p className="text-lg text-muted-foreground">
                Imagine confidently visualizing every outfit before buying.
              </p>
            </div>
          </div>
          {/* <Button className="mt-6 px-6 py-3 text-lg font-semibold shadow-md">
            Learn How It Works <ArrowRight size={20} className="ml-2" />
          </Button> */}
        </motion.div>

        {/* Right Column: Before-and-After Slider */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          <Compare
        firstImage="/1.png"
        secondImage="/2.png"
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
        slideMode="hover"
        autoplay={true}
        initialSliderPercentage={0}
        autoplayDuration={5000}
      />
        </motion.div>
      </div>
    </section>

      {/* Solution Section */}
      <section className="py-24 px-6 ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Transform your shopping experience in three simple steps</p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03, translateY: -5 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="relative bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl shadow-md">
          {index + 1}
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <div className="p-4 bg-secondary rounded-full w-fit mx-auto transform transition-transform hover:rotate-6">
          {step.icon}
            </div>
            <h3 className="text-2xl font-semibold">{step.title}</h3>
            <p className="text-muted-foreground text-lg">{step.desc}</p>
          </div>
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
          <ArrowRight className="w-8 h-8 text-primary animate-pulse" />
            </div>
          )}
        </motion.div>
          ))}
        </div>
      </section>

      {/* Target Users Section */}
      <section className="py-24 px-6">
        <h2 className="text-4xl font-extrabold text-foreground text-center">Who Needs It?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {users.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-[500px] sm:h-[600px] overflow-hidden bg-secondary text-secondary-foreground hover:shadow-xl transition-all">
                <div className="h-2/3 w-full">
                  <Image
                    src={user.img}
                    alt={user.name}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="text-center py-4">
                  <CardTitle className="text-xl font-semibold">{user.name}</CardTitle>
                </CardHeader>
                <CardContent className="h-1/3 flex items-center justify-center">
                  <p className="text-center text-muted-foreground px-4">{user.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-3xl font-medium text-center mb-16"
          >
        The Essentials
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <div className="flex flex-col space-y-4 p-6 rounded-lg border border-border/5 hover:border-border/20 transition-colors duration-300">
          <div className="w-10 h-10 flex items-center justify-center">
            {feature.icon}
          </div>
          <h3 className="text-lg font-medium">{feature.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {feature.desc}
          </p>
            </div>
          </motion.div>
        ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-secondary/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground">
        Real experiences from people who transformed their shopping journey
          </p>
        </motion.div>
        <div className="max-w-4xl mx-auto mt-16">
          <AnimatedTestimonialsDemo />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
          >
        <h2 className="text-4xl font-bold">Common Questions</h2>
        <p className="text-lg text-muted-foreground mt-4">
          Everything you need to know about our virtual try-on technology
        </p>
          </motion.div>

          <div className="grid gap-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="text-lg font-medium">{faq.question}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-muted-foreground">{faq.answer}</p>
          </CardContent>
            </Card>
          </motion.div>
        ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          <motion.h2 
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        className="text-5xl md:text-6xl font-bold text-white mb-8"
          >
        Transform Your Shopping Experience Today
          </motion.h2>
          <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
          >
        Join over 10,000+ fashion enthusiasts who've revolutionized their wardrobe decisions
          </motion.p>
          <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
          >
        <Button
          className="bg-white text-primary hover:bg-white/90"
          size="lg"
        >
          Get Started Free
          <Plus className="ml-2 h-5 w-5" />
        </Button>
        <Button
        
          className="border-white text-white hover:bg-white/10"
          size="lg"
        >
          Watch Demo
          <Code className="ml-2 h-5 w-5" />
        </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}