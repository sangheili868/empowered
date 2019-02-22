
import { ORM } from 'redux-orm';
import bio from './models/bio';
import character from './models/character'

const orm = new ORM();
orm.register(bio, character);

export default orm;