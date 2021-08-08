const generateData = (count) => {
    let data = [];
    for(let i = 0; i < count; i++) {
        let name = mokki[Math.round(Math.random()*200)];
        let secondName = mokki[Math.round(Math.random()*200)];
        let position = mokki[Math.round(Math.random()*200)];
        data.push({name, secondName, position});
    }

    return data;
};
