'use client';
import Image from "next/image";

const AboutUs = () => {
    const imagesShortStories = [
        {
            image:'./file.svg',
            Stories: (<div>
                <h2>What is tax</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit laudantium velit enim sit amet, architecto earum natus vitae quam maiores nulla quod.</p>
            </div>)
        },
        {
            image:'./file.svg',
            Stories: (<div>
                <h2>What is tax</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit laudantium velit enim sit amet, architecto earum natus vitae quam maiores nulla quod.</p>
            </div>)
        }
    ]
    return (
        <div className={`pt-56`}>
            <div className={`flex flex-col items-center`}>
                {
                    imagesShortStories.map((item, index)=>(
                        <div key={index} className={`flex w-[70%] items-center justify-center`}>
                            <Image src={item.image} width={100} height={100} alt="image" />
                            {item.Stories}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AboutUs
