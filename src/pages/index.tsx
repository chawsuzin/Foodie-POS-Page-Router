import Head from "next/head";
import Image from "next/image";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return <h1 className={`${roboto.className}`}>Foodie Home Page</h1>;
}
