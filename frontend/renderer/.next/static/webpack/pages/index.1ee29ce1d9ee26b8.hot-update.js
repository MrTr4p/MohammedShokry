"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSP\": function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_BillTypeModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/BillTypeModal */ \"./components/BillTypeModal.tsx\");\n/* harmony import */ var _components_Table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Table */ \"./components/Table.tsx\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store */ \"./store/index.ts\");\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\nvar IndexPage = function(param) {\n    var publicBills = param.publicBills, officeBills = param.officeBills;\n    _s();\n    var homePublicBills = (0,_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(function(state) {\n        return state.homePublicBills;\n    });\n    var homeOfficeBills = (0,_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(function(state) {\n        return state.homeOfficeBills;\n    });\n    var setHomePublicBills = (0,_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(function(state) {\n        return state.setHomePublicBills;\n    });\n    var setHomeOfficeBills = (0,_store__WEBPACK_IMPORTED_MODULE_4__.useStore)(function(state) {\n        return state.setHomeOfficeBills;\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        setHomePublicBills(publicBills);\n        setHomeOfficeBills(officeBills);\n    }, [\n        publicBills,\n        officeBills\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"space-y-12\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n                className: \"flex justify-between items-start\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col items-start gap-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                className: \"text-black font-bold text-3xl\",\n                                children: \"الفواتير\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                                lineNumber: 35,\n                                columnNumber: 6\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: \"هنا يوجد جميع الفواتير ويمكن البحث فيهم\"\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                                lineNumber: 36,\n                                columnNumber: 6\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                        lineNumber: 34,\n                        columnNumber: 5\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_BillTypeModal__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                        lineNumber: 38,\n                        columnNumber: 5\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                lineNumber: 33,\n                columnNumber: 4\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            className: \"bg-base drop-shadow-lg w-full border border-black rounded-md h-12\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                            lineNumber: 42,\n                            columnNumber: 6\n                        }, _this)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                        lineNumber: 41,\n                        columnNumber: 5\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-col lg:flex-row md:gap-4 lg:gap-6\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Table__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                title: \"الفواتير العامة\",\n                                data: homePublicBills.slice(0, 50)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                                lineNumber: 45,\n                                columnNumber: 6\n                            }, _this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Table__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                title: \"الفواتير الخاصة\",\n                                data: homeOfficeBills.slice(0, 50)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                                lineNumber: 50,\n                                columnNumber: 6\n                            }, _this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                        lineNumber: 44,\n                        columnNumber: 5\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n                lineNumber: 40,\n                columnNumber: 4\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\ahmed\\\\Documents\\\\GitHub\\\\MohammedShokry\\\\frontend\\\\renderer\\\\pages\\\\index.tsx\",\n        lineNumber: 32,\n        columnNumber: 3\n    }, _this);\n};\n_s(IndexPage, \"XvzKPAZp7THmYEXKcI4pQR+/rvY=\", false, function() {\n    return [\n        _store__WEBPACK_IMPORTED_MODULE_4__.useStore,\n        _store__WEBPACK_IMPORTED_MODULE_4__.useStore,\n        _store__WEBPACK_IMPORTED_MODULE_4__.useStore,\n        _store__WEBPACK_IMPORTED_MODULE_4__.useStore\n    ];\n});\n_c = IndexPage;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (IndexPage);\nvar _c;\n$RefreshReg$(_c, \"IndexPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7O0FBU2tDO0FBQ3NCO0FBQ2hCO0FBQ1M7QUFPakQsSUFBTUksU0FBUyxHQUFHLGdCQUEwQztRQUF2Q0MsV0FBVyxTQUFYQSxXQUFXLEVBQUVDLFdBQVcsU0FBWEEsV0FBVzs7SUFDNUMsSUFBTUMsZUFBZSxHQUFHSixnREFBUSxDQUFDLFNBQUNLLEtBQUs7ZUFBS0EsS0FBSyxDQUFDRCxlQUFlO0tBQUEsQ0FBQztJQUNsRSxJQUFNRSxlQUFlLEdBQUdOLGdEQUFRLENBQUMsU0FBQ0ssS0FBSztlQUFLQSxLQUFLLENBQUNDLGVBQWU7S0FBQSxDQUFDO0lBQ2xFLElBQU1DLGtCQUFrQixHQUFHUCxnREFBUSxDQUFDLFNBQUNLLEtBQUs7ZUFBS0EsS0FBSyxDQUFDRSxrQkFBa0I7S0FBQSxDQUFDO0lBQ3hFLElBQU1DLGtCQUFrQixHQUFHUixnREFBUSxDQUFDLFNBQUNLLEtBQUs7ZUFBS0EsS0FBSyxDQUFDRyxrQkFBa0I7S0FBQSxDQUFDO0lBRXhFWCxnREFBUyxDQUFDLFdBQU07UUFDZlUsa0JBQWtCLENBQUNMLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDTSxrQkFBa0IsQ0FBQ0wsV0FBVyxDQUFDLENBQUM7SUFDakMsQ0FBQyxFQUFFO1FBQUNELFdBQVc7UUFBRUMsV0FBVztLQUFDLENBQUMsQ0FBQztJQUUvQixxQkFDQyw4REFBQ00sS0FBRztRQUFDQyxTQUFTLEVBQUMsWUFBWTs7MEJBQzFCLDhEQUFDQyxRQUFNO2dCQUFDRCxTQUFTLEVBQUMsa0NBQWtDOztrQ0FDbkQsOERBQUNELEtBQUc7d0JBQUNDLFNBQVMsRUFBQyxpQ0FBaUM7OzBDQUMvQyw4REFBQ0UsSUFBRTtnQ0FBQ0YsU0FBUyxFQUFDLCtCQUErQjswQ0FBQyxVQUFROzs7OztxQ0FBSzswQ0FDM0QsOERBQUNHLEdBQUM7MENBQUMseUNBQXVDOzs7OztxQ0FBSTs7Ozs7OzZCQUN6QztrQ0FDTiw4REFBQ2YsaUVBQWE7Ozs7NkJBQWlCOzs7Ozs7cUJBQ3ZCOzBCQUNULDhEQUFDZ0IsTUFBSTs7a0NBQ0osOERBQUNMLEtBQUc7a0NBQ0gsNEVBQUNNLE9BQUs7NEJBQUNDLElBQUksRUFBQyxNQUFNOzRCQUFDTixTQUFTLEVBQUcsbUVBQW1FOzs7OztpQ0FBRTs7Ozs7NkJBQy9GO2tDQUNOLDhEQUFDRCxLQUFHO3dCQUFDQyxTQUFTLEVBQUMsNkNBQTZDOzswQ0FDM0QsOERBQUNYLHlEQUFLO2dDQUNMa0IsS0FBSyxFQUFFLGlCQUFpQjtnQ0FDeEJDLElBQUksRUFBRWQsZUFBZSxDQUFDZSxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7Ozs7cUNBQzFCOzBDQUVULDhEQUFDcEIseURBQUs7Z0NBQ0xrQixLQUFLLEVBQUUsaUJBQWlCO2dDQUN4QkMsSUFBSSxFQUFFWixlQUFlLENBQUNhLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDOzs7OztxQ0FDMUI7Ozs7Ozs2QkFDSjs7Ozs7O3FCQUNBOzs7Ozs7YUFDRixDQUNMO0FBQ0gsQ0FBQztHQXRDS2xCLFNBQVM7O1FBQ1VELDRDQUFRO1FBQ1JBLDRDQUFRO1FBQ0xBLDRDQUFRO1FBQ1JBLDRDQUFROzs7QUFKOUJDLEtBQUFBLFNBQVM7O0FBd0NmLCtEQUFlQSxTQUFTLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXgudHN4PzA3ZmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0Q2FsZW5kYXJEYXlzSWNvbixcblx0TGlua0ljb24sXG5cdFBlbmNpbEljb24sXG5cdFBlbmNpbFNxdWFyZUljb24sXG59IGZyb20gXCJAaGVyb2ljb25zL3JlYWN0LzI0L291dGxpbmVcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IEdldFNlcnZlclNpZGVQcm9wcyB9IGZyb20gXCJuZXh0XCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBCaWxsVHlwZU1vZGFsIGZyb20gXCIuLi9jb21wb25lbnRzL0JpbGxUeXBlTW9kYWxcIjtcbmltcG9ydCBUYWJsZSBmcm9tIFwiLi4vY29tcG9uZW50cy9UYWJsZVwiO1xuaW1wb3J0IHsgUHJvamVjdEJpbGwsIHVzZVN0b3JlIH0gZnJvbSBcIi4uL3N0b3JlXCI7XG5cbmludGVyZmFjZSBJUHJvcHMge1xuXHRwdWJsaWNCaWxsczogUHJvamVjdEJpbGxbXTtcblx0b2ZmaWNlQmlsbHM6IFByb2plY3RCaWxsW107XG59XG5cbmNvbnN0IEluZGV4UGFnZSA9ICh7IHB1YmxpY0JpbGxzLCBvZmZpY2VCaWxscyB9OiBJUHJvcHMpID0+IHtcblx0Y29uc3QgaG9tZVB1YmxpY0JpbGxzID0gdXNlU3RvcmUoKHN0YXRlKSA9PiBzdGF0ZS5ob21lUHVibGljQmlsbHMpO1xuXHRjb25zdCBob21lT2ZmaWNlQmlsbHMgPSB1c2VTdG9yZSgoc3RhdGUpID0+IHN0YXRlLmhvbWVPZmZpY2VCaWxscyk7XG5cdGNvbnN0IHNldEhvbWVQdWJsaWNCaWxscyA9IHVzZVN0b3JlKChzdGF0ZSkgPT4gc3RhdGUuc2V0SG9tZVB1YmxpY0JpbGxzKTtcblx0Y29uc3Qgc2V0SG9tZU9mZmljZUJpbGxzID0gdXNlU3RvcmUoKHN0YXRlKSA9PiBzdGF0ZS5zZXRIb21lT2ZmaWNlQmlsbHMpO1xuXG5cdHVzZUVmZmVjdCgoKSA9PiB7XG5cdFx0c2V0SG9tZVB1YmxpY0JpbGxzKHB1YmxpY0JpbGxzKTtcblx0XHRzZXRIb21lT2ZmaWNlQmlsbHMob2ZmaWNlQmlsbHMpO1xuXHR9LCBbcHVibGljQmlsbHMsIG9mZmljZUJpbGxzXSk7XG5cblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMTJcIj5cblx0XHRcdDxoZWFkZXIgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtc3RhcnRcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLXN0YXJ0IGdhcC0yXCI+XG5cdFx0XHRcdFx0PGgxIGNsYXNzTmFtZT1cInRleHQtYmxhY2sgZm9udC1ib2xkIHRleHQtM3hsXCI+2KfZhNmB2YjYp9iq2YrYsTwvaDE+XG5cdFx0XHRcdFx0PHA+2YfZhtinINmK2YjYrNivINis2YXZiti5INin2YTZgdmI2KfYqtmK2LEg2YjZitmF2YPZhiDYp9mE2KjYrdirINmB2YrZh9mFPC9wPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PEJpbGxUeXBlTW9kYWw+PC9CaWxsVHlwZU1vZGFsPlxuXHRcdFx0PC9oZWFkZXI+XG5cdFx0XHQ8bWFpbj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWUgPSBcImJnLWJhc2UgZHJvcC1zaGFkb3ctbGcgdy1mdWxsIGJvcmRlciBib3JkZXItYmxhY2sgcm91bmRlZC1tZCBoLTEyXCIvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IG1kOmdhcC00IGxnOmdhcC02XCI+XG5cdFx0XHRcdFx0PFRhYmxlXG5cdFx0XHRcdFx0XHR0aXRsZT17XCLYp9mE2YHZiNin2KrZitixINin2YTYudin2YXYqVwifVxuXHRcdFx0XHRcdFx0ZGF0YT17aG9tZVB1YmxpY0JpbGxzLnNsaWNlKDAsIDUwKX1cblx0XHRcdFx0XHQ+PC9UYWJsZT5cblxuXHRcdFx0XHRcdDxUYWJsZVxuXHRcdFx0XHRcdFx0dGl0bGU9e1wi2KfZhNmB2YjYp9iq2YrYsSDYp9mE2K7Yp9i12KlcIn1cblx0XHRcdFx0XHRcdGRhdGE9e2hvbWVPZmZpY2VCaWxscy5zbGljZSgwLCA1MCl9XG5cdFx0XHRcdFx0PjwvVGFibGU+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9tYWluPlxuXHRcdDwvZGl2PlxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5kZXhQYWdlO1xuXG5leHBvcnQgY29uc3QgZ2V0U2VydmVyU2lkZVByb3BzOiBHZXRTZXJ2ZXJTaWRlUHJvcHMgPSBhc3luYyAoY29udGV4dCkgPT4ge1xuXHRjb25zdCB7IGRhdGE6IGJpbGxzRGF0YSB9ID0gYXdhaXQgYXhpb3Moe1xuXHRcdHVybDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvZ2V0QWxsP3R5cGU9cHVibGljXCIsXG5cdH0pO1xuXG5cdHJldHVybiB7XG5cdFx0cHJvcHM6IHtcblx0XHRcdHB1YmxpY0JpbGxzOiBiaWxsc0RhdGEsXG5cdFx0XHRvZmZpY2VCaWxsczogYmlsbHNEYXRhLFxuXHRcdH0sXG5cdH07XG59O1xuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsIkJpbGxUeXBlTW9kYWwiLCJUYWJsZSIsInVzZVN0b3JlIiwiSW5kZXhQYWdlIiwicHVibGljQmlsbHMiLCJvZmZpY2VCaWxscyIsImhvbWVQdWJsaWNCaWxscyIsInN0YXRlIiwiaG9tZU9mZmljZUJpbGxzIiwic2V0SG9tZVB1YmxpY0JpbGxzIiwic2V0SG9tZU9mZmljZUJpbGxzIiwiZGl2IiwiY2xhc3NOYW1lIiwiaGVhZGVyIiwiaDEiLCJwIiwibWFpbiIsImlucHV0IiwidHlwZSIsInRpdGxlIiwiZGF0YSIsInNsaWNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.tsx\n"));

/***/ })

});