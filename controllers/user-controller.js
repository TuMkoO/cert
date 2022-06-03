const Role = require("../models/Role");
const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password, name, role } = req.body;

      const userData = await userService.registration(
        email,
        password,
        name,
        role
      );

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        domain:
          process.env.NODE_ENV === "production"
            ? "naks-donbass.ru"
            : "localhost",
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res) {
    try {
      // console.log("req.body :::= ", req.body);
      const { id, email, name, role } = req.body;
      const userData = await userService.update(id, email, name, role);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async updatePassword(req, res) {
    try {
      // console.log("req.body :::= ", req.body);
      const { id, oldPassword, newPassword } = req.body;
      // console.log("updatePassword req.body::: ", req.body);
      const userData = await userService.updatePassword(
        id,
        oldPassword,
        newPassword
      );
      // return res.json(userData);
      return res.status(201).json({ message: "Пароль успешно изменён" });
    } catch (e) {
      // console.log("ERROR: ", e);
      // next(e);
      // return res.status(500).json({ message: e });
      // return res.status(500).json({ message: e });
      return res.status(500).json({ message: e });
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken", {
        httpOnly: true,
        domain:
          process.env.NODE_ENV === "production"
            ? "naks-donbass.ru"
            : "localhost",
      });
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      if (id) {
        await userService.delete(id);
        res.status(200).json({ message: "Пользователь успешно удален!" });
      }
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    // console.log("user-controller/refresh req::: ", req);
    // console.log("user-controller/refresh req.cookies::: ", req.cookies);
    try {
      const { refreshToken } = req.cookies;
      //console.log("user-controller/refresh refreshToken===", refreshToken); // токен проходит

      const userData = await userService.refresh(refreshToken);
      //console.log("user-controller/refresh userData===", userData); // сюда не доходит...

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        domain:
          process.env.NODE_ENV === "production"
            ? "naks-donbass.ru"
            : "localhost",
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      //создание новых ролей
      // const userRole = new Role();
      // const adminRole = new Role({ value: "admin" });
      // const godRole = new Role({ value: "god" });
      // await userRole.save();
      // await adminRole.save();
      // await godRole.save();

      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getUserById(req, res, next) {
    try {
      // console.log("req+++ ", req);
      // console.log("req.body+++ ", req.body);
      // console.log("req.params.id+++ ", req.params.id);

      const id = req.params.id;
      // console.log("id+++ ", id);
      const user = await userService.getUserById(id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async getUserCurrent(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      // console.log("user-controller/getUserCurrent refreshToken", refreshToken); // приходит ...
      const user = await userService.getUserCurrent(refreshToken);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
