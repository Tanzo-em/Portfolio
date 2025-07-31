import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Dribbble, Loader2, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setSubmitStatus('success');
      form.reset();
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: (error) => {
      setSubmitStatus('error');
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: InsertContact) => {
    setSubmitStatus('idle');
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="animate-fadeInUp">
              <h3 className="text-2xl font-semibold text-slate-100 mb-6">Let's Start a Conversation</h3>
              <p className="text-slate-300 leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, I'll do my best to get back to you!
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors duration-300">
                  <Mail className="text-cyan-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">Email</h4>
                  <p className="text-slate-400">john@developer.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors duration-300">
                  <Phone className="text-cyan-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">Phone</h4>
                  <p className="text-slate-400">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors duration-300">
                  <MapPin className="text-cyan-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">Location</h4>
                  <p className="text-slate-400">San Francisco, CA</p>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="pt-8">
              <h4 className="font-semibold text-slate-100 mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <Dribbble className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-slate-300 mb-2">Full Name</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="John Doe"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-300 mb-2">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="john@example.com"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject" className="text-slate-300 mb-2">Subject</Label>
                <Input
                  id="subject"
                  {...form.register("subject")}
                  placeholder="Project Inquiry"
                  className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
                {form.formState.errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.subject.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="message" className="text-slate-300 mb-2">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  {...form.register("message")}
                  placeholder="Tell me about your project..."
                  className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
                />
                {form.formState.errors.message && (
                  <p className="text-red-400 text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              {/* Form Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                  Something went wrong. Please try again.
                </div>
              )}
              
              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100"
              >
                {contactMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
