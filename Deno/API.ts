import { Application, Router } from "https://deno.land/x/oak/mod.ts";
//FILE: Model
export interface Student{
    id: number,
    name: string,
    college: string,
    location: string,
    coursesEnrolled: number
    certification: boolean
}

//FILE: Data

let students: Array<Student> = [
    {
        id: 1,
        name: "Manoj",
        college: "AGI",
        location: "HYD",
        coursesEnrolled: 3,
        certification: true,
    },
    {
        id: 2,
        name: "Kumar",
        college: "AGI",
        location: "HYD",
        coursesEnrolled: 5,
        certification: false,
    },
    {
        id: 3,
        name: "Lasya",
        college: "Priyadarshini",
        location: "KMM",
        coursesEnrolled: 3,
        certification: true,
    }
];





const getStudents = ({response} : {response: any}) => {
    response.body = students;
};

const addStudents = async(
    {request, response} : {request:any, response: any},
    ) => {
    const body = await request.body()

    const student: Student = body.value;
    
    students.push(student);
    response.body = {studentAdded: "SUCCESS"};
    response.status = 200;
};


//FILE: Server File

const router = new Router();
const app = new Application();
const PORT = 4300;

router.get("/students", getStudents).post("/addStudent", addStudents)

app.use(router.routes());
app.use(router.allowedMethods());
console.log("Server is Running!!!.....")
await app.listen({port: PORT});

