import LeftPanel from "@/components/home/left-panel";
import RightPanel from "@/components/home/right-panel";
import { useTheme } from "next-themes";

export default function Channels() {
  return (
    <main style={{position:"relative",marginTop:"8%"}}>       
          <LeftPanel/>
          <RightPanel/>        
    </main>
  );
}
