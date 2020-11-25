import {Request, Response} from 'express';
import {Link} from '../models/link';


const links : Link[] = [];
let proxID = 1;

const generateCode = () => {
  let text = '';
  const possilidades = 'ABCDEFGHIJKLMNOPQRSTUVWXYZacbdefghijklmnopqrstuvwxyz0123456789';
  for(let i = 0; i < 5 ; i++){
    text += possilidades.charAt(Math.floor(Math.random() * possilidades.length));
  }
  return text;
}

const getLink = (req: Request, res: Response) =>{
  const code = req.params.code as string;
  const link = links.find(item => item.code === code);
  if(!link){
    res.sendStatus(404);
  }else{
    res.status(201).json(link);
  }
}

const postLink = (req: Request, res: Response) => {
  const link = req.body as Link;
  link.id = proxID++;
  link.code = generateCode();
  link.hits = 0;
  links.push(link);
  res.status(201).json(links);
}

const hitLink = (req: Request, res: Response) => {
  const code =  req.params.code as string;
  const index = links.findIndex(item => item.code === code);
  if(index === -1){
    res.sendStatus(404);
  }else{
    links[index].hits!++;
    res.status(201).json(links[index]);
  }
  
}

export default {
  postLink,
  getLink,
  hitLink
}