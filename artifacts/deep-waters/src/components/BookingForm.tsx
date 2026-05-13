import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  date: z.string().min(1, "Date is required"),
  guests: z.coerce.number().min(1, "At least 1 guest required"),
  phone: z.string().min(5, "Phone number is required"),
});

export function BookingForm() {
  const { t, isRtl } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: "",
      guests: 1,
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    let template = t("whatsapp.template");
    template = template.replace("{name}", values.name);
    template = template.replace("{date}", values.date);
    template = template.replace("{guests}", values.guests.toString());
    template = template.replace("{phone}", values.phone);

    const encoded = encodeURIComponent(template);
    window.open(`https://wa.me/38268889498?text=${encoded}`, '_blank');
  };

  return (
    <section id="book" className="py-24 bg-card border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4">{t("form.title")}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-background/80 backdrop-blur-sm p-8 border border-white/10 shadow-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">{t("form.name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("form.namePlaceholder")} className="bg-card/50 border-white/10 rounded-none h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">{t("form.date")}</FormLabel>
                        <FormControl>
                          <Input type="date" className="bg-card/50 border-white/10 rounded-none h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">{t("form.guests")}</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} className="bg-card/50 border-white/10 rounded-none h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-wider text-xs">{t("form.phone")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("form.phonePlaceholder")} type="tel" className="bg-card/50 border-white/10 rounded-none h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-14 rounded-none font-heading text-xl tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="btn-submit-booking">
                  {t("form.submit")}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
