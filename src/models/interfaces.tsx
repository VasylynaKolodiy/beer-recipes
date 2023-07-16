export interface IRecipe {
    id: number
    name: string
    tagline: string
    first_brewed: string
    description: string
    image_url: string
    abv: number
    ibu: number
    target_fg: number
    target_og: number
    ebc: number
    srm: number
    ph: number
    attenuation_level: number
    volume: IVolume
    boil_volume: IVolume
    method: IMethod
    ingredients: IIngredients
    food_pairing: string[]
    brewers_tips: string
    contributed_by: string
}

export interface IVolume {
    value: number
    unit: string
}

export interface IMethod {
    mash_temp: IMashTemp[]
    fermentation: IFermentation
    twist: string
}

export interface IMashTemp {
    temp: IVolume
    duration: number
}

export interface IFermentation {
    temp: IVolume
}

export interface IIngredients {
    malt: IMalt[]
    hops: IHop[]
    yeast: string
}

export interface IMalt {
    name: string
    amount: IVolume
}

export interface IHop {
    name: string
    amount: IVolume
    add: string
    attribute: string
}
