/* eslint-disable @typescript-eslint/no-explicit-any */

const apiURi = "http://localhost:2004/api/v1/products";


// get attribute by item
export async function get_attributeCatalog_by_item(id_item?: string | number) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/${id_item}`);
        if (!res.ok) {
            return res
        }
        const { data_attribute } = await res.json();
        return data_attribute
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

// get attribute by seller
export async function get_attributeCatalog_by_seller(id_seller?: string | number) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/seller/${id_seller}`);
        if (!res.ok) {
            return res;
        }
        const { data } = await res.json();
        return data
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}


export async function create_attributesCatalog(value: any) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        return res
    } catch (error) {
        return (error || "Lỗi rồi đại vương ơi!");
    }
}

export async function create_value_attributeCatalog(value: any) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/create_value`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        return res
    } catch (error) {
        return error
    }
}

export async function remove_value_varriant_attributeCatalog(value: any) {
    try {
        const res = await fetch(`${apiURi}/remove-attribute/${value?.id_account}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        return res
    } catch (error) {
        return error
    }
}

export async function update_attribute_catalog(value: { _id: string | number, attribute: string }) {
    try {
        const res = await fetch(`${apiURi}/attribute_catalog/update/${value?._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        return res
    } catch (error) {
        return error
    }
}