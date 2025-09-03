import Hero from "../components/(public)/home/Hero/Hero";
import DescriptionLeft from "../components/(public)/home/DescriptionLeft/DescriptionLeft";
import DescriptionRight from "../components/(public)/home/DescriptionRight/DescriptionRight";
import Reviwes from "../components/(public)/home/Reviwes/Reviwes";


export default function Home() {
  
  return (
    <div>
   <Hero
   src='/next.svg'
   name='test hero component'
   text='some text'
   />
   <Reviwes/>
   <Hero
   src='/next.svg'
   name='test hero component'
   text='some more hero text'
   />
   <DescriptionLeft/>
   <Hero
      src='/next.svg'
      name='test hero component'
      text='some more hero text'
   />
   <DescriptionRight/>
    </div>
  )
}
