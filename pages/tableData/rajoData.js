export const ProductServiceRajo = {
    getProductsData() {
        return [
            {
                Rajo: "Rajo 1",
                DiarioReal: 1000,
                DiarioPlan: 2000,
                KPI1: 0.5,
                SemanaISOReal: 3000,
                SemanaISOPlan: 4000,
                KPI2: 0.75,
                SemanaReal: 5000,
                SemanaPlan: 6000,
                KPI3: 0.8,
                MensualReal: 7000,
                MensualPlan: 8000,
                KPI4: 0.9,
                AnualReal: 9000,
                AnualPlan: 10000,
                KPI5: 0.95,
            },
        ]
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData());
    },

};