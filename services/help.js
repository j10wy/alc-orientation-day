alcStarter.service('helpService', function() {
        return {
            data: [{
                title: "How to import contacts",
                id: 1,
                body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur fuga ullam maiores harum libero dignissimos quo, ipsa sit sint temporibus laboriosam blanditiis consectetur cum facilis atque ad labore, odio quisquam!"
            }, {
                title: "How to send a message",
                id: 2,
                body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A itaque quibusdam dolore laboriosam aut, obcaecati ullam cumque doloremque dolores excepturi eaque odit quas adipisci, neque facilis magni eum repellat, sed."
            }, {
                title: "How to update your personal page",
                id: 3,
                body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A itaque quibusdam dolore laboriosam aut, obcaecati ullam cumque doloremque dolores excepturi eaque odit quas adipisci, neque facilis magni eum repellat, sed."
            }, {
                title: "Coporage match information",
                id: 4,
                body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A itaque quibusdam dolore laboriosam aut, obcaecati ullam cumque doloremque dolores excepturi eaque odit quas adipisci, neque facilis magni eum repellat, sed."
            }],
            getHelpItems: function() {
                return this.data;
            }
        }
    })