import mongoose, { mongo } from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// Interace that describes the properties
// a User Model has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  // when we want to reflect anoter field updateAt and access it,
  // then add here as
  // updatedAt: string;
}

// This definition is for Mongoose, not Typescript
// There is no Typescript errors and warnings
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String, // this is a constructor, vs string
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password; // normal JSvascript command to remove property
        delete ret.__v;
      },
    },
  }
);

// this is mongoose middleware
// this is an old style:  cannot use arrow function, need to use done
userSchema.pre('save', async function (done) {
  // if we only change the email, we do not want to rehash the password
  // this is also true if in-memory object is created with User(email, password)
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// This is a Generics definition
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
