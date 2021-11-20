"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.UsuarioService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var UsuarioService = /** @class */ (function () {
    function UsuarioService(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    UsuarioService.prototype.List = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usuarioRepository.find()];
            });
        });
    };
    UsuarioService.prototype.save = function (email, password, name) {
        return __awaiter(this, void 0, void 0, function () {
            var created, _a, _b, error_1;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        _b = (_a = this.usuarioRepository).insert;
                        _c = {
                            email: email
                        };
                        return [4 /*yield*/, this.hashPassword(password)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.password = _d.sent(),
                                _c.name = name,
                                _c)])];
                    case 2:
                        created = _d.sent();
                        if (created.identifiers[0].id != 0 ||
                            created.identifiers[0].id != undefined) {
                            return [2 /*return*/, {
                                    message: 'salvo com sucesso',
                                    statusCode: 204
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _d.sent();
                        return [2 /*return*/, { mensagem: error_1.message, statusCode: error_1.code }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioService.prototype.auth = function (username, pass) {
        return __awaiter(this, void 0, void 0, function () {
            var find, findOne, usuario, validaPassword, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usuarioRepository.find({
                            where: { email: username },
                            take: 1
                        })];
                    case 1:
                        find = _a.sent();
                        return [4 /*yield*/, this.usuarioRepository.findOne(find[0].id)];
                    case 2:
                        findOne = _a.sent();
                        usuario = __assign({}, findOne);
                        return [4 /*yield*/, this.comparePassword(pass, usuario.password)];
                    case 3:
                        validaPassword = _a.sent();
                        if (usuario && validaPassword) {
                            result = __rest(usuario, []);
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioService.prototype.hashPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 1:
                        hash = _a.sent();
                        return [2 /*return*/, hash];
                }
            });
        });
    };
    UsuarioService.prototype.comparePassword = function (password, passwordSql) {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.compare(password, passwordSql)];
                    case 1:
                        hash = _a.sent();
                        return [2 /*return*/, hash];
                }
            });
        });
    };
    UsuarioService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)('USUARIO_REPOSITORY'))
    ], UsuarioService);
    return UsuarioService;
}());
exports.UsuarioService = UsuarioService;
