const { MongoClient } = require('mongodb');

async function main(){
    const uri = "mongodb+srv://admin:mono2022@chatcluster.tep7xot.mongodb.net/test";
    const client = new MongoClient(uri);
    try{
        await client.connect();
        //10
        // await deleteListingsScrapedBeforeDate(client, new Date("2019-02-16"));
        //9
        // await deleteListingByName(client, "Loft");
        //8
        // await updateAllListingsToHavePropertyType(client);

        //7 
        // await upsertListingByName(client, "Cozy Cottage", {name: "Cozy Cottage", bedrooms:2, bathrooms:1 });

        //6
        // await updateListingByName(client, "Infinite Views", {bedrooms:12, beds: 100 });
        // await updateListingByName(client, "Bayaraa", {company:"Mono solution"});
        await updateListingByName(client, "Totoro", {ip_address:"10.10.10.10.2"});

        //5
        // await findListingsWithMinBedroomsBathroomsAndMostRecentReviews(client, {
        //     minBedrooms: 1,
        //     minBathrooms: 2,
        //     maxResult: 2,
        // });

        //4 find
        // await findOneListingByName(client, "Loft");

        //3 multi create
        // await createMultipleListings(client, [
        //     {
        //         name: "Infinite Views",
        //         summary: "Modern home",
        //         property_type: "Houses",
        //         bedrooms: 5,
        //         bathrooms:3,
        //         beds:9

        //     },
        //     {
        //         name: "Lovely Loft",
        //         summary: "A charming loft in Paris",
        //         property_type: "Apartment",
        //         bedrooms: 7,
        //         bathrooms:8,
        //         beds:5
        //     },
        //     {
        //         name: "Loft",
        //         summary: " Paris",
        //         bedrooms: 5,
        //         bathrooms:3,
        //         beds:2,
        //         last_review: new Date()

        //     }
        // ])


        //2 create
        // await createListing(client, {
        //     name: "Lovely Loft",
        //     summary: "A charming loft in Paris",
        //     bedrooms: 1,
        //     bathrooms: 1
        // name:"Bayaraa",
        // email:"dbayaraa1112@gmail.com",
        // password:"bayaraa"
        // })

        //1 await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();

    }
    
}
main().catch(console.error);
async function deleteListingsScrapedBeforeDate(client, date ){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteMany({"last_scraped": {$lt:date}});
    console.log(`${result.deletedCount} document(s) was / were deletedmany`)
}

async function deleteListingByName(client, nameOfListing){
    const result = await client.db("sample_airbnb").collection("listingAndReviews").deleteOne({name: nameOfListing});
    console.log(`${result.deletedCount} document(s) was / were deleted1`);
}



async function updateAllListingsToHavePropertyType(client){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany({property_type: {$exists:false}}, 
        { $set:{property_type: "Unknow"}});
        console.log(`${result.matchedCount} document(s) matched query criteria`);
        console.log(`${result.modifiedCount} document(s) was / were updated1`);
    
}


async function upsertListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingAndReviews").updateOne({name: nameOfListing}, {$set: updatedListing}, {$upsert: true});

    console.log(`${result.matchedCount} document(s) matched query criteria`);

    if(result.upsertedCount > 0){
        console.log(`One document was inserted with id ${result.upsertedId}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was / were updated`);
    }
}



async function updateListingByName(client, nameOfListing, updatedListing){
    const result = await client.db("chatbot_user").collection("userListings").updateOne({name:nameOfListing}, {$set: updatedListing});

    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    console.log(`${result.modifiedCount} document was/ were updated`);
}


async function findListingsWithMinBedroomsBathroomsAndMostRecentReviews(client, {
    minBedrooms = 0,
    minBathrooms = 0,
    maxResult = Number.MAX_SAFE_INTEGER

} = {}){
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find({
        bedrooms: { $gte: minBedrooms},
        bathrooms: {$gte: minBathrooms}
    }).sort({ last_review: -1})
      .limit(maxResult);

      const results = await cursor.toArray();

      if(results.length > 0) {
        console.log(`Found listing(s) with at list ${minBedrooms}
        bedrooms and ${minBathrooms} bathrooms:`);
        results.forEach((result, i) => {
            date = new Date(result.last_review).toDateString();
            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(` _id: ${result._id}`);
            console.log(`  bedrooms: ${result.bedrooms}`);
            console.log(`  bathrooms: ${result.bathrooms}`);
            console.log(`  most recent review date: ${new Date(result.last_review).toDateString()}`);
        });
      } else {
        console.log(`No listing(s) found with at least ${minBedrooms}
        bedrooms and ${minBathrooms} bathrooms:`);
      }

}

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: nameOfListing});

    if(result){
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    } else{
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function createMultipleListings(client, newListings){
    const result = await client.db("sample_airbnb").collection("listingAndReviews").insertMany(newListings);

    console.log(`${result.insertedCount} New listing created with the following id(s):`);
    console.log(result.insertedIds);

}


async function createListing(client, newListing){
    const result = await client.db("chatbot_user").collection("userListings").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);

}
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Database: ");
    databasesList.databases.forEach(db =>{
        console.log(`- ${db.name}`);
    })
}