import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { FiUpload } from 'react-icons/fi';
import { updateDisplayPicture } from '../../../services/operations/settingsAPI';

const ChangeProfilePicture = () => {

    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);


    const handleClick = () => {
        fileInputRef.current.click();
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file)
            previewFile(file);

        }
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }


    const handleFileUpload = async () => {
        try {
            setLoading(true);
            const formData = new FormData()
            formData.append("displayPicture", imageFile);
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false);
            })
        }
        catch (error) {
            console.log("ERROR MEAASGE - ", error.message)
        }

    }

    useEffect(() => {
        if(imageFile){
            previewFile(imageFile)
        }
    },[imageFile])
    return (
        <div className='w-9/12 flex gap-4 rounded-md border-[1px] bg-gray-700 border-gray-600 text-gray-50 px-10 py-5'>

            {/* image part */}
            <div>
                <img
                    src={previewSource || user?.image}
                    alt={`profile-${user?.firstName}`}
                    key={user?.image}
                    className='aspect-square w-[70px] rounded-full object-cover'

                />
            </div>

            {/* Right part */}
            <div className='flex flex-col gap-2'>
                <p>Change Profile Picture</p>

                <div className='flex gap-x-4'>
                    <input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className='hidden'
                        accept='image/png, image/gif, image/jpeg, image/jpg, application/pdf'
                    />
                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className='cursor-pointer rounded-md bg-gray-600 py-2 px-4
                        font-bold text-gray-50 '
                    >
                        Select
                    </button>
                    <IconBtn
                        text={loading ? "Uploading.." : "Upload"}
                        onclick={handleFileUpload}
                    >
                        {
                            !loading && (
                                <FiUpload className="text-lg" />
                            )
                        }
                    </IconBtn>
                </div>
            </div>
        </div>
    )
}

export default ChangeProfilePicture
