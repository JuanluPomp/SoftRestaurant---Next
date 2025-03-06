export function formatCurrency(amount: number){
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export function getCorrectPathname(pathName: string){
    const basePathName = 'https://res.cloudinary.com'
    if(pathName.startsWith(basePathName)){
        return pathName
    }else{
        return `/products/${pathName}.jpg`
    }
}