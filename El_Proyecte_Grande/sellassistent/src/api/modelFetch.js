
import { CreateAPIEndPoint, ENDPOINTS } from "./Index"

const [user, setUser] = useState([]);

useEffect(()=>{
    CreateAPIEndPoint(ENDPOINTS.USER).fetchAll()
    .then(res => {
        let {id, first_name, last_name} = res.data;
        let user = [{
            id: id,
            userName: `${first_name} ${last_name}`
        }];
        setUser(user);      
    })
    .catch(err => console.log(err))
},[])

