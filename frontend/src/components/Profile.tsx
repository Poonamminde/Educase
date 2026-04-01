import Picture from '../assets/picture.png'
import Camera from '../assets/camera.png'

const Profile = () => {
    return (
        <div>
            <div className="h-[68px] bg-[#FFFFFF] flex items-center px-4 text-[18px]">Account Settings</div>
            <div className="p-[30px] text-[14px]">
                <div className="flex gap-4">
                    <div className="relative">
                        <img src={Picture} alt="Profile" className="rounded-full w-[76px] h-[76px]" />
                        <img src={Camera} alt="Camera" className="w-[21px] h-[23px] absolute bottom-0 right-0" />
                    </div>
                    <div>
                        <p className="font-semibold">Marry Doe</p>
                        <p className="font-normal">Marry@Gmail.Com</p>
                    </div>
                </div>
            </div>
            <p className="px-[20px] text-[14px]">Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam</p>
        </div>
    )
}

export default Profile