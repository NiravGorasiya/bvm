import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { HTTP_CODE, HTTP_MESSAGE } from "../config/constants";
import CommonHelper from "../helpers/common.helper";
import { Users } from "../models";
import { Types } from "mongoose";
import path from "path";
import fs from "fs";

const modelName = "User";

class UserController {
  public static getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await Users.find();

      return CommonHelper.sendResponse(res, true, HTTP_CODE.OK, {
        message: HTTP_MESSAGE.LISTED(modelName),
        data,
      });
    } catch (error) {
      console.log({ error });
      return CommonHelper.sendResponse(
        res,
        false,
        HTTP_CODE.INTERNAL_SERVER_ERROR,
        { message: HTTP_MESSAGE.SOMETHING_WRONG() }
      );
    }
  };

  public static getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const user = await Users.findById(id);

      if (!user) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.NOT_FOUND, {
          message: HTTP_MESSAGE.NOT_EXIST(modelName),
        });
      }

      return CommonHelper.sendResponse(res, true, HTTP_CODE.OK, {
        message: HTTP_MESSAGE.LISTED(modelName),
        data: user,
      });
    } catch (error) {
      console.log({ error });
      return CommonHelper.sendResponse(
        res,
        false,
        HTTP_CODE.INTERNAL_SERVER_ERROR,
        { message: HTTP_MESSAGE.SOMETHING_WRONG() }
      );
    }
  };

  public static create = async (req: Request, res: Response) => {
    try {
      const file = req.file;

      if (!file) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.BAD_REQUEST, {
          message: HTTP_MESSAGE.NOT_EXIST(modelName),
        });
      }
      const { email, password, name, phone, description } = req.body;
      const userExists = await Users.findOne({
        email: { $regex: "^" + email + "$", $options: "i" },
      });

      if (userExists) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.BAD_REQUEST, {
          message: HTTP_MESSAGE.ALREADY_EXIST_WITH(modelName, "email"),
        });
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      await Users.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        phone,
        description,
        // image: file.originalname,
      });

      return CommonHelper.sendResponse(res, true, HTTP_CODE.CREATED, {
        message: HTTP_MESSAGE.CREATED(modelName),
      });
    } catch (error) {
      console.log({ error });
      return CommonHelper.sendResponse(
        res,
        false,
        HTTP_CODE.INTERNAL_SERVER_ERROR,
        { message: HTTP_MESSAGE.SOMETHING_WRONG() }
      );
    }
  };

  public static update = async (req: Request | any, res: Response) => {
    try {
      const _id = new Types.ObjectId(req.params.id);
      const user = await Users.findById(_id);

      if (!user) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.NOT_FOUND, {
          message: HTTP_MESSAGE.NOT_EXIST(modelName),
        });
      }

      // const file = req.file;

      // if (!file) {
      //   return CommonHelper.sendResponse(res, false, HTTP_CODE.BAD_REQUEST, {
      //     message: HTTP_MESSAGE.NOT_EXIST(modelName),
      //   });
      // }

      const { email, password, name, phone, description } = req.body;

      const isEmailIdAccess: any = await Users.findOne({
        email: { $eq: email },
        _id: { $ne: _id },
      });

      if (isEmailIdAccess) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.BAD_REQUEST, {
          message: HTTP_MESSAGE.ALREADY_EXIST_WITH(modelName, "email"),
        });
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      let userData = await Users.findByIdAndUpdate(
        _id,
        {
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
          phone,
          description,
        },
        { new: true }
      );

      return CommonHelper.sendResponse(res, true, HTTP_CODE.OK, {
        message: HTTP_MESSAGE.UPDATED(modelName),
        data: userData,
      });
    } catch (error) {
      console.log({ error });
      return CommonHelper.sendResponse(
        res,
        false,
        HTTP_CODE.INTERNAL_SERVER_ERROR,
        { message: HTTP_MESSAGE.SOMETHING_WRONG() }
      );
    }
  };

  public static delete = async (req: Request | any, res: Response) => {
    try {
      const _id = req.params.id;

      const user = await Users.findById(_id);
      if (!user) {
        return CommonHelper.sendResponse(res, false, HTTP_CODE.NOT_FOUND, {
          message: HTTP_MESSAGE.NOT_EXIST(modelName),
        });
      }

      await Users.findByIdAndRemove(user._id);
      return CommonHelper.sendResponse(res, true, HTTP_CODE.OK, {
        message: HTTP_MESSAGE.DELETED(modelName),
      });
    } catch (error) {
      console.log({ error });
      return CommonHelper.sendResponse(
        res,
        false,
        HTTP_CODE.INTERNAL_SERVER_ERROR,
        { message: HTTP_MESSAGE.SOMETHING_WRONG() }
      );
    }
  };
}

export default UserController;
