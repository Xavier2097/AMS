import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from "preact-iso";

import { Header } from "./components/header/Header";
import { Home } from "./pages/Home/index.jsx";
import { NotFound } from "./pages/_404.jsx";
import "./style.css";
import { ProductDetails } from "./pages/Product/ProductDetails";
import { About } from "./pages/About/About";



export function App() {

  const navButtons = [
    { id: "home", title: "INICIO", href: "/" },
    // { id: "404", title: "404", href: "/404" },
    { id: "about", title: "ACERCA DE", href: "/About" },
  ];

  return (
    <LocationProvider>
      <Header
      navButtons={navButtons}
      />
      <main>
		
        <Router>
          <Route path="/" component={Home} />
          <Route path="/product-details/:id" component={ProductDetails} />
          <Route path="/About" component={About} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
