import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
    <div>hello world</div>
    <Button>subscribe</Button>
    <UserButton/>
    </div>
    
  );
}
