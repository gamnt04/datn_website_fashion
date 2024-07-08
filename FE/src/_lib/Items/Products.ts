
const baseUri = 'http://localhost:2004/api/v1/products';



export async function get_items_client (page? : number) {
    try {
        let uri = baseUri;
        if (page) {
            uri += `?_page=${page}`;
        }
        const res = await fetch (`${uri}`);
        if (!res.ok) {
            console.warn ("Kiem tra lai server hoac internet !")
        }
        const {data} = await res.json();
        return data.docs
    } catch (error) {
        console.log(error || "Loi server!")
    }
}

export async function get_detail_items (id? : number | string) {
    try {
        const res = await fetch (`${id}`);
        if (!res.ok) {
            console.warn ("Kiem tra lai server hoac internet !")
        }
        const {data} = await res.json();
        return data.docs
    } catch (error) {
        console.log(error || "Loi server!")
    }
}


export async function add_items_client (items : any) {
    try {
        const res = await fetch (`${baseUri}`, {
            method : 'post',
            headers : {
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify(items)
        });
        if (!res.ok) {
            console.warn ("Kiem tra lai server hoac internet !")
        }
        const {data} = await res.json();
        return data.docs
    } catch (error) {
        console.log(error || "Loi server!")
    }
}


export async function edit_items_client (items : any) {
    try {
        const res = await fetch (`${baseUri}/${items._id}`, {
            method : 'put',
            headers : {
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify(items)
        });
        if (!res.ok) {
            console.warn ("Kiem tra lai server hoac internet !")
        }
        const {data} = await res.json();
        return data.docs
    } catch (error) {
        console.log(error || "Loi server!")
    }
}


export async function remove_items_client (id : any) {
    try {
        const res = await fetch (`${baseUri}/${id}`, {
            method : 'delete',
        });
        if (!res.ok) {
            console.warn ("Kiem tra lai server hoac internet !")
        }
        const {data} = await res.json();
        return data.docs
    } catch (error) {
        console.log(error || "Loi server!")
    }
}



