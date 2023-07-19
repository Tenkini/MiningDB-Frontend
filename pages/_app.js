import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";

export default function App({ Component, pageProps, router }) {
  return (
    <motion.div
      key={router.route}
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      <ThemeProvider attribute="class" enableSystem={true}>
          <title>Reportes Mineros</title>
        
        <Component {...pageProps} />
      </ThemeProvider>
    </motion.div>
  );
}
