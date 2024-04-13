import Image from 'next/image';
import AlooParathaImage from '../../../public/Aloo_Paratha.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Menu = () => {

    const baseUrl = `http://localhost:7080/api`;
    const user = sessionStorage.getItem('ut');
    const [ menu, setMenu ] = useState(null);

    const breakfastItems = menu && menu.filter(menuItem => menuItem.category === "breakfast");
    const lunchItems = menu && menu.filter(menuItem => menuItem.category === "lunch");
    const dinnerItems = menu && menu.filter(menuItem => menuItem.category === "dinner");
    const fastfoodItems = menu && menu.filter(menuItem => menuItem.category === "fast food");
    const beveragesItems = menu && menu.filter(menuItem => menuItem.category === "beverages");

    const renderBreakfastItems = breakfastItems && breakfastItems.map(item => {
        const imageLoader = () => {
            return `${baseUrl}/images/${item.image}`;
        }
        return(
            <div key={item._id} className="item min-w-60 max-w-80  border-2 border-green-700 tracking-wider flex flex-col">
                <Image src={AlooParathaImage} loader={imageLoader} width={500} height={100} alt="item image" />
                <div className='px-4 py-2 flex flex-col h-full'>
                    <h2 className='item-title text-3xl my-3'>{item.name}</h2>
                    <p className='item-desc self-stretch h-full text-slate-500'>{item.description}</p>
                    <p className="price text-2xl my-3 text-green-500">{item.price + " ₹"}</p>
                    { user ? <button className='bg-red-700 rounded text-xl py-2 mb-2 cursor-pointer hover:bg-red-600' onClick={() => handleDelete(item._id)}>Delete</button> : null }
                </div>
            </div>
        );
    });

    const renderLunchItems = lunchItems && lunchItems.map(item => {
        const imageLoader = () => {
            return `${baseUrl}/images/${item.image}`;
        }
        return(
            <div key={item._id} className="item min-w-60 max-w-80  border-2 border-yellow-700 tracking-wider flex flex-col">
                <Image src={AlooParathaImage} loader={imageLoader} width={500} height={300} alt="item image" />
                <div className='px-4 py-2 flex flex-col h-full'>
                    <h2 className='item-title text-3xl my-3'>{item.name}</h2>
                    <p className='item-desc self-stretch h-full text-slate-500'>{item.description}</p>
                    <p className="price text-2xl my-3 text-yellow-500">{item.price + " ₹"}</p>
                    { user ? <button className='bg-red-700 rounded text-xl py-2 mb-2 cursor-pointer hover:bg-red-600' onClick={() => handleDelete(item._id)}>Delete</button> : null }
                </div>
            </div>
        );
    });
    
    const renderDinnerItems = dinnerItems && dinnerItems.map(item => {
        const imageLoader = () => {
            return `${baseUrl}/images/${item.image}`;
        }
        return(
            <div key={item._id} className="item min-w-60 max-w-80  border-2 border-orange-700 tracking-wider flex flex-col">
                <Image src={AlooParathaImage} loader={imageLoader} width={500} height={300} alt="item image" />
                <div className='px-4 py-2 flex flex-col h-full'>
                    <h2 className='item-title text-3xl my-3'>{item.name}</h2>
                    <p className='item-desc self-stretch h-full text-slate-500'>{item.description}</p>
                    <p className="price text-2xl my-3 text-orange-500">{item.price + " ₹"}</p>
                    { user ? <button className='bg-red-700 rounded text-xl py-2 mb-2 cursor-pointer hover:bg-red-600' onClick={() => handleDelete(item._id)}>Delete</button> : null }
                </div>
            </div>
        );
    });
    
    const renderFastfoodItems = fastfoodItems && fastfoodItems.map(item => {
        const imageLoader = () => {
            return `${baseUrl}/images/${item.image}`;
        }
        return(
            <div key={item._id} className="item min-w-60 max-w-80  border-2 border-yellow-700 tracking-wider flex flex-col">
                <Image src={AlooParathaImage} loader={imageLoader} width={500} height={300} alt="item image" />
                <div className='px-4 py-2 flex flex-col h-full'>
                    <h2 className='item-title text-3xl my-3'>{item.name}</h2>
                    <p className='item-desc self-stretch h-full text-slate-500'>{item.description}</p>
                    <p className="price text-2xl my-3 text-yellow-500">{item.price + " ₹"}</p>
                    { user ? <button className='bg-red-700 rounded text-xl py-2 mb-2 cursor-pointer hover:bg-red-600' onClick={() => handleDelete(item._id)}>Delete</button> : null }
                </div>
            </div>
        );
    });
    
    const renderBeveragesItems = beveragesItems && beveragesItems.map(item => {
        const imageLoader = () => {
            return `${baseUrl}/images/${item.image}`;
        }
        return(
            <div key={item._id} className="item min-w-60 max-w-80 border-2 tracking-wider flex flex-col">
                <Image src={AlooParathaImage} loader={imageLoader} width={500} height={300} alt="item image" />
                <div className='px-4 py-2 flex flex-col h-full'>
                    <h2 className='item-title text-3xl my-3'>{item.name}</h2>
                    <p className='item-desc self-stretch h-full text-slate-500'>{item.description}</p>
                    <p className="price text-2xl my-3 text-green-500">{item.price + " ₹"}</p>
                    { user ? <button className='bg-red-700 rounded text-xl py-2 mb-2 cursor-pointer hover:bg-red-600' onClick={() => handleDelete(item._id)}>Delete</button> : null }
                </div>
            </div>
        );
    });
    
    const handleDelete = async (itemId) => {
        const validate = confirm("Are you sure to delete item?");
        if(validate){
            try {
                const token = user;
                const headersList = {
                    "Accept": "*/*",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json" 
                }
                const reqOptions = {
                    url: `${baseUrl}/item/delete`,
                    method: "DELETE",
                    headers: headersList,
                    data: { itemId },
                }
                const res = await axios.request(reqOptions);
                res && alert(res.data);
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    useEffect(() => {
        const fetchMenuData = (baseUrl) => {
            axios.get(`${baseUrl}/item`)
            .then(res => {
                setMenu(res.data);
            })
            .catch(err => console.log(err));
        }
        fetchMenuData(baseUrl);
    }, []);
    
    return (
        <div className="menu-main min-h-[90vh] scroll-smooth w-screen flex flex-col  justify-start items-start font-kanit py-14 px-12">
            <div className="hero-section ">
                <h1 className="text-7xl my-5 ml-16 mt-20">Discover Our Menu</h1>
            </div>
            {/* Breakfast */}
            <div className="breakfast-items pt-20" id='menu'>
                <h1 className="my-5 text-4xl text-green-500">Breakfast Items</h1>
                <hr className='mb-5 border-green-700' />
                <div className="items flex flex-wrap gap-3">
                    {/* Item */}
                    {renderBreakfastItems}
                </div>
            </div>
            {/* Lunch */}
            <div className="lunch-items py-10">
                <h1 className="my-5 text-4xl text-yellow-500">Lunch Items</h1>
                <hr className='mb-5 border-yellow-700' />
                <div className="items flex flex-wrap  gap-3">
                    {/* Item */}
                    {renderLunchItems}
                </div>
            </div>
            {/* Dinner */}
            <div className="lunch-items py-10">
                <h1 className="my-5 text-4xl text-orange-500">Dinner</h1>
                <hr className='mb-5 border-orange-700' />
                <div className="items flex flex-wrap  gap-3">
                    {/* Item */}
                    {renderDinnerItems}
                </div>
            </div>
            {/* Fast Food */}
            <div className="lunch-items py-10">
                <h1 className="my-5 text-4xl text-yellow-500">Fast Food Items</h1>
                <hr className='mb-5 border-yellow-700' />
                <div className="items flex flex-wrap  gap-3">
                    {/* Item */}
                    {renderFastfoodItems}
                </div>
            </div>
            {/* Beverages */}
            <div className="lunch-items py-10">
                <h1 className="my-5 text-4xl">Beverages</h1>
                <hr className='mb-5' />
                <div className="items flex flex-wrap  gap-3">
                    {/* Item */}
                    {renderBeveragesItems}
                </div>
            </div>
        </div>
    );
}

export default Menu;