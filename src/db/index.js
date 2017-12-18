import mongoose from 'mongoose';
import path from 'path';
import * as R from 'ramda';

import fs from 'fs';
import csvParse from 'csv-parse';
import arrayShuffle from 'array-shuffle';

import userSchema from './models/User';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nicholas');

export const User = mongoose.model('User', userSchema);
