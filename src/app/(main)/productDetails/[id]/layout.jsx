import axios from 'axios';

// 1. We keep it async
export async function generateMetadata({ params }) {
  // 2. AWAIT THE PARAMS! (Required in newer Next.js versions)
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  
  // 3. Safety Check: If there is no ID, or it says "undefined", don't ping the backend
  if (!id || id === "undefined" || id === "null") {
    return {
      title: 'Product Not Found',
    };
  }
  
  try {
    const res = await axios.get(`https://artizans-mart-ecommerce-server.onrender.com/product/${id}`);
    
    // Smart extraction
    let productObj = res.data;
    if (productObj && productObj.data) productObj = productObj.data;
    else if (productObj && productObj.product) productObj = productObj.product;
    if (Array.isArray(productObj)) productObj = productObj[0];

    // Truncate the description for social media
    const shortDescription = productObj?.long_description?.substring(0, 150) + "...";

    return {
      title: productObj.name,
      description: shortDescription,
      openGraph: {
        title: `${productObj.name} | ৳${productObj.offer_price}`,
        description: shortDescription,
        images: [
          {
            url: productObj.images?.[0] || "/placeholder.png",
            width: 800,
            height: 800,
            alt: productObj.name,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${productObj.name} | ৳${productObj.offer_price}`,
        description: shortDescription,
        images: [productObj.images?.[0] || "/placeholder.png"],
      },
    };
  } catch (error) {
    // We log the specific backend error status to help with future debugging
    console.error(`SEO Metadata Fetch Error [${error.response?.status}]:`, error.message);
    return {
      title: 'Product Not Found',
    };
  }
}

export default function ProductLayout({ children }) {
  return <>{children}</>;
}