import { Request, Response } from 'express';
import { User, UserOptionalDefaults } from '../../../types/generated';
import {
  createUser,
  findUserByEmail,
  findUser,
  findUserById,
} from '../services/user.service';
import { comparePassword, hashPassword } from '../utils/hashPassword';
import { createTokenUser } from '../utils/createToken';
import { attachedCookiesToResponse } from '../utils/jwt';

export const register = async (
  req: Request<{}, {}, UserOptionalDefaults>,
  res: Response,
) => {
  try {
    const {
      username, password
    } = req.body;

    const user = await findUser({ username });

    if (!user) {

      const hashedPassword = await hashPassword(password);
      const tempUser = { ...req.body, password: hashedPassword };
      const newUser = await createUser(tempUser);
      const { collection, email, lastName, firstName, id, profileImage, } = newUser;

      return res.status(201).json({
        message: 'user created successfully',
        user: {
          username,
          firstName,
          email,
          lastName,
          userId: id,
          collection,
          profileImage
        }
      }
      )
    }

    return res.status(400).json({ message: 'username already taken' });

  }

  catch (error) {
    return res.status(400).json(error);
  }
};

// eslint-disable-next-line max-len
export const login = async (req: Request, res: Response) => {
  try {
    const {
      username, password
    } = req.body;
    const user = await findUser({ username });

    const isMatch = user && comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'authentication invalid' });
    }

    const token = createTokenUser(user)

    // console.log(object);
    attachedCookiesToResponse(res, token)
    res.status(200).json({ message: 'Login successful' })
  } catch (error: any) {

    return res.status(400).json(error);
  }




};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "user logged out" });
};

export const currentUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as User;
    const user = await findUserById({ id });
    console.log(user, "user");
    return res.status(200).json({
      user: {
        userId: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        username: user?.username,
        profileImage: user?.profileImage,
        collection: user?.collection,
      },
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// const getCurrentUser = async (req, res) => {
//   const user = await User.findOne({ _id: req.user.userId });
//   res.status(StatusCodes.OK).json({ user, location: user.location });
// };