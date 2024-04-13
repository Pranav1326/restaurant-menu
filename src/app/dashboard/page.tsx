'use client';
import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';

const Dashboard = () => {

    const user = sessionStorage.getItem('ut');
    const baseUrl = "http://localhost:7080/api";
    
    const [ itemData, setItemData ] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: ""
    });

    const handleChange = (e: any) => {
        setItemData({...itemData, [e.target.name]: e.target.value});
    }
    
    const handlePhoto = (e: any) => {
        setItemData({...itemData, image: e.target.files[0]});
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', itemData.name);
        formData.append('description', itemData.description);
        formData.append('price', itemData.price);
        formData.append('category', itemData.category);
        formData.append('image', itemData.image);

        try {
            const reqOptions = {
                url: `${baseUrl}/item/add`,
                method: "POST",
                data: formData,
            }
            const res = await axios.request(reqOptions)
            res && alert(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useLayoutEffect(() => {
        if(!user){
            redirect('/login');
        }
    }, []);
    
    return(
        <div className="dashboard-main h-[90vh] w-full flex justify-center items-center font-kanit">
            <div className="input-box p-10 border-2 rounded-md flex flex-col">
                <form method='post' encType="multipart/form-data" onSubmit={handleSubmit}>
                    <h1 className="heading text-4xl text-center text-green-700">Add New Item</h1>
                    <div className="item-name flex flex-col mt-5">
                        <span>Item Name</span>
                        <input type="text" value={itemData.name} onChange={handleChange}  className="bg-transparent border-2 px-3 py-2 rounded text-green-500 tracking-wider"  name="name" placeholder="Item Name Here" />
                    </div>
                    <div className="item-description flex flex-col mt-5">
                        <span>Item Description</span>
                        <input type="text" value={itemData.description} onChange={handleChange}  className="bg-transparent border-2 px-3 py-2 rounded text-green-500 tracking-wider"  name="description" placeholder="Item Description" />
                    </div>
                    <div className="item-image flex flex-col mt-5">
                        <span>Image</span>
                        <input type="file" onChange={handlePhoto} className="bg-transparent border-2 px-3 py-2 rounded text-green-500 tracking-wider"  name="image" placeholder="Item Image" />
                    </div>
                    <div className="item-price flex flex-col mt-5">
                        <span>Item Price</span>
                        <input type="number" value={itemData.price} onChange={handleChange} className="bg-transparent border-2 px-3 py-2 rounded text-green-500 tracking-wider"  name="price" placeholder="Item Price in ₹" />
                    </div>
                    <div className="item-category flex flex-col mt-5">
                        <span>Item Category</span>
                        <select value={itemData.category} onChange={handleChange} className="bg-transparent border-2 px-3 py-2 rounded text-green-500 tracking-wider"  name="category">
                            <option value={"breakfast"}>Breakfast</option>
                            <option value={"lunch"}>Lunch</option>
                            <option value={"dinner"}>Dinner</option>
                            <option value={"fast food"}>Fast Food</option>
                            <option value={"beverages"}>Beverages</option>
                        </select>
                    </div>
                    {/* <Link href='/' className='self-center w-full mt-5'> */}
                        <button type="submit" className="w-full mt-5 bg-green-700 rounded px-3 py-2 hover:bg-green-800 tracking-wider">Add Item</button>
                    {/* </Link> */}
                </form>
            </div>
        </div>
    );
}

export default Dashboard;