const { MongoClient } = require("mongodb");
 
const url = "mongodb+srv://erikatwell12:Erik@cluster1.nw07bnw.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(url);
 
 const dbName = "Library";
                      
 async function run() {
    try {
        // Connect to the cluster
         await client.connect();
         const db = client.db(dbName);

         // Reference the "Books" collection in the specified database
         const col = db.collection("Books");

         // New books                                                                                                                                        
         const initialBooks = [
            {
              title: 'Reactions in REACT',
              author: 'Ben Dover',
              publisher: 'Random House',
              ISBN: '978-3-16-148410-0',
              status: 'available',
              checkedOutBy: '',
              dueDate: ''
            },
            {
              title: 'Express-sions',
              author: 'Frieda Livery',
              publisher: 'Chaotic House',
              ISBN: '978-3-16-148410-2',
              status: 'available',
              checkedOutBy: '',
              dueDate: ''
            },
            {
              title: 'Restful REST',
              author: 'Al Gorithm',
              publisher: 'ACM',
              ISBN: '978-3-16-143310-1',
              status: 'available',
              checkedOutBy: '',
              dueDate: ''
            },
            {
              title: 'See Essess',
              author: 'Anna Log',
              publisher: "O'Reilly",
              ISBN: '987-6-54-148220-1',
              status: 'checked-out',
              checkedOutBy: 'Homer',
              dueDate: '1/1/23'
            },
            {
              title: 'Scripting in JS',
              author: 'Dee Gital',
              publisher: 'IEEE',
              ISBN: '987-6-54-321123-1',
              status: 'checked-out',
              checkedOutBy: 'Marge',
              dueDate: '1/2/23'
            },
            {
              title: 'Be An HTML Hero',
              author: 'Jen Neric',
              publisher: 'Coders-R-Us',
              ISBN: '987-6-54-321123-2',
              status: 'checked-out',
              checkedOutBy: 'Lisa',
              dueDate: '1/3/23'
            },
            {
              title: 'History',
              author: 'George Washington',
              publisher: 'HHH',
              ISBN: '978-3-16-143310-10',
              status: 'available',
              checkedOutBy: '',
              dueDate: ''
            },
            {
              title: 'Biology',
              author: 'Marie Curie',
              publisher: "Wilson's",
              ISBN: '987-6-54-148220-11',
              status: 'available',
              checkedOutBy: '',
              dueDate: ''
            },
            {
              title: 'Chemistry',
              author: 'Alfred Nobel',
              publisher: 'CHEM',
              ISBN: '987-6-54-321123-12',
              status: 'available',
              checkedOutBy: '',
              dueDate: ''
            },
            {
              title: 'Calculus',
              author: 'Albert Einstein',
              publisher: 'MathisRad',
              ISBN: '987-6-54-321123-13',
              status: 'checked-out',
              checkedOutBy: 'Bob',
              dueDate: '1/12/23'
            },
          ];
        

         // Insert the document into the correct collection        
         const p = await col.insertMany(initialBooks);
    


        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
 }
run().catch(console.dir);
