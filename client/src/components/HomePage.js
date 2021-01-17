import React from 'react';

class HomePage extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                                      
                </div>
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6 homewriteup">
                        <h1>Welcome to MakanBah!</h1>  
                        <p>Makan bah! is a restaurant recommendations website, which allows it's users to search for restaurants nearby them and also create a personalised bucket-list of their restaurant choices.</p>
                        <p> The name "Makan bah!" was derived from the word "Makan", which means "Eat" in the English language, and "bah" from Sabahan slang which is a colloquial words used in Sabah, Malaysia. With Makan Bah!, you don't have to worry again where to eat next!
                        </p>
                    </div>
                </div>
            </div>

        );
    }
}

export default HomePage;