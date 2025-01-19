export const SelectTravelList=[
    {
        id:1,
        title:'Just Me',
        desc:'A solo travels in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travels in tandem',
        icon:'🏝️',
        people:'2 People'
    },
    {
        id:3,
        title:'Friends',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrilled-seekes',
        icon:'🚢 ',
        people:'5 to 10 People'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵 ',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about the cost',
        icon:'💸'
    },
]

export const AI_PROMPT='Generate Travel Plan for Location:{location}, for {totalDays} Days for {traveler} with a {budget} budget,give me Hotels option list with HotelName, Hotel address, Price, hotelimage url, geo coordinated, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo coordinates, ticket Pricing, Time travel each of location for {totalDays} days with each day best time to visit in JSON format '