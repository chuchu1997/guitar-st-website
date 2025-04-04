

interface DichVuPageWithProps {  
    params:Promise<{slug:string}>


}



const DichVuPageWithSlug  = async (props:DichVuPageWithProps) =>{
    const {params} = props;
    const {slug} = await params;
    const encodedSlug = encodeURIComponent(`dich-vu/${slug}`);
    

    //GET SERVICE WITH SLUG  ;


    //GET SERVICE ITEM 



    return <div className = "container mx-auto">
    
    
    
    
    DAY LA DICH VU PAGE VOI SLUG {encodedSlug}
    
    
    </div>
    

}


export default DichVuPageWithSlug;
