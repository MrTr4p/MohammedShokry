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

/***/ "./store/index.ts":
/*!************************!*\
  !*** ./store/index.ts ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useStore\": function() { return /* binding */ useStore; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_object_spread_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swc/helpers/src/_object_spread.mjs */ \"../node_modules/.pnpm/@swc+helpers@0.4.11/node_modules/@swc/helpers/src/_object_spread.mjs\");\n/* harmony import */ var _swc_helpers_src_to_consumable_array_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @swc/helpers/src/_to_consumable_array.mjs */ \"../node_modules/.pnpm/@swc+helpers@0.4.11/node_modules/@swc/helpers/src/_to_consumable_array.mjs\");\n/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand */ \"../node_modules/.pnpm/zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/index.js\");\n/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zustand/middleware */ \"../node_modules/.pnpm/zustand@4.1.1_immer@9.0.15+react@18.2.0/node_modules/zustand/esm/middleware.js\");\n\n\n\n\nvar storeSlice = function(set) {\n    return {\n        setSearchState: function(state) {\n            return set(function() {\n                return {\n                    search: search\n                };\n            });\n        },\n        workers: [],\n        homePublicBills: [],\n        homeOfficeBills: [],\n        searchState: \"empty\",\n        setHomePublicBills: function(bills) {\n            return set(function() {\n                return {\n                    homePublicBills: bills\n                };\n            });\n        },\n        setHomeOfficeBills: function(bills) {\n            return set(function() {\n                return {\n                    homeOfficeBills: bills\n                };\n            });\n        },\n        setWorkers: function(workers) {\n            return set(function() {\n                return {\n                    workers: workers\n                };\n            });\n        },\n        newWorker: function(worker) {\n            return set(function(state) {\n                return {\n                    workers: (0,_swc_helpers_src_to_consumable_array_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(state.workers).concat([\n                        worker\n                    ])\n                };\n            });\n        }\n    };\n};\nvar newProjectBillSlice = function(set) {\n    return {\n        id: 0,\n        officePrecentage: 0,\n        name: \"\",\n        clientName: \"\",\n        clientAddress: \"\",\n        date: \"\",\n        expenses: [],\n        revenues: [],\n        sections: [],\n        workers: []\n    };\n};\nvar useStore = (0,zustand__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_2__.devtools)(function() {\n    for(var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++){\n        a[_key] = arguments[_key];\n    }\n    return (0,_swc_helpers_src_object_spread_mjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({}, newProjectBillSlice.apply(void 0, (0,_swc_helpers_src_to_consumable_array_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(a)), storeSlice.apply(void 0, (0,_swc_helpers_src_to_consumable_array_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(a)));\n}, {\n    name: \"app-storage\"\n}));\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUErQztBQUNRO0FBOER2RCxJQUFNRSxVQUFVLEdBS1osU0FBQ0MsR0FBRztXQUFNO1FBQ2JDLGNBQWMsRUFBRSxTQUFDQyxLQUFLO21CQUFLRixHQUFHLENBQUM7dUJBQU87b0JBQUVHLE1BQU0sRUFBTkEsTUFBTTtpQkFBRTthQUFDLENBQUM7U0FBQTtRQUNsREMsT0FBTyxFQUFFLEVBQUU7UUFDWEMsZUFBZSxFQUFFLEVBQUU7UUFDbkJDLGVBQWUsRUFBRSxFQUFFO1FBQ25CQyxXQUFXLEVBQUUsT0FBTztRQUNwQkMsa0JBQWtCLEVBQUUsU0FBQ0MsS0FBSzttQkFBS1QsR0FBRyxDQUFDO3VCQUFPO29CQUFFSyxlQUFlLEVBQUVJLEtBQUs7aUJBQUU7YUFBQyxDQUFDO1NBQUE7UUFDdEVDLGtCQUFrQixFQUFFLFNBQUNELEtBQUs7bUJBQUtULEdBQUcsQ0FBQzt1QkFBTztvQkFBRU0sZUFBZSxFQUFFRyxLQUFLO2lCQUFFO2FBQUMsQ0FBQztTQUFBO1FBQ3RFRSxVQUFVLEVBQUUsU0FBQ1AsT0FBTzttQkFBS0osR0FBRyxDQUFDO3VCQUFPO29CQUFFSSxPQUFPLEVBQUVBLE9BQU87aUJBQUU7YUFBQyxDQUFDO1NBQUE7UUFDMURRLFNBQVMsRUFBRSxTQUFDQyxNQUFNO21CQUNqQmIsR0FBRyxDQUFDLFNBQUNFLEtBQUssRUFBSztnQkFDZCxPQUFPO29CQUFFRSxPQUFPLEVBQUUscUZBQUlGLEtBQUssQ0FBQ0UsT0FBTyxDQUFiRixRQUFKO3dCQUFtQlcsTUFBTTtxQkFBQztpQkFBRSxDQUFDO1lBQ2hELENBQUMsQ0FBQztTQUFBO0tBQ0g7Q0FBQztBQWVGLElBQU1DLG1CQUFtQixHQUtyQixTQUFDZCxHQUFHO1dBQU07UUFDYmUsRUFBRSxFQUFFLENBQUM7UUFDTEMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQkMsSUFBSSxFQUFFLEVBQUU7UUFDUkMsVUFBVSxFQUFFLEVBQUU7UUFDZEMsYUFBYSxFQUFFLEVBQUU7UUFDakJDLElBQUksRUFBRSxFQUFFO1FBQ1JDLFFBQVEsRUFBRSxFQUFFO1FBQ1pDLFFBQVEsRUFBRSxFQUFFO1FBQ1pDLFFBQVEsRUFBRSxFQUFFO1FBQ1puQixPQUFPLEVBQUUsRUFBRTtLQUNYO0NBQUM7QUFFSyxJQUFNb0IsUUFBUSxHQUFHM0IsbURBQU0sRUFBMEIsQ0FDdkRDLDREQUFRLENBQ1A7cUNBQUkyQixDQUFDO1FBQURBLENBQUM7O1dBQU0sbUZBQUtYLG1CQUFtQixDQUFuQkEsS0FBeUIsQ0FBekJBLEtBQUFBLENBQW1CLEVBQUMscUZBQUdXLENBQUMsQ0FBREEsQ0FBRSxFQUFLMUIsVUFBVSxDQUFWQSxLQUFnQixDQUFoQkEsS0FBQUEsQ0FBVSxFQUFDLHFGQUFHMEIsQ0FBQyxDQUFEQSxDQUFFLENBQUU7Q0FBQyxFQUNqRTtJQUNDUixJQUFJLEVBQUUsYUFBYTtDQUNuQixDQUNELENBQ0QsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zdG9yZS9pbmRleC50cz9iNWIzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGUsIHsgU3RhdGVDcmVhdG9yIH0gZnJvbSBcInp1c3RhbmRcIjtcclxuaW1wb3J0IHsgZGV2dG9vbHMsIHBlcnNpc3QgfSBmcm9tIFwienVzdGFuZC9taWRkbGV3YXJlXCI7XHJcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IHsgcHJvZHVjZSB9IGZyb20gXCJpbW1lclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0QmlsbCB7XHJcblx0aWQ6IG51bWJlcjtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0Y2xpZW50TmFtZTogc3RyaW5nO1xyXG5cdGNsaWVudEFkZHJlc3M6IHN0cmluZztcclxuXHRvZmZpY2VQcmVjZW50YWdlOiBudW1iZXI7XHJcblx0d29ya2VyczogV29ya2VyW107XHJcblx0cmV2ZW51ZXM6IFJldmVudWVbXTtcclxuXHRleHBlbnNlczogRXhwZW5zZVtdO1xyXG5cdHNlY3Rpb25zOiBTZWN0aW9uW107XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtlciB7XHJcblx0aWQ6IHN0cmluZztcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0d29yazogc3RyaW5nO1xyXG5cdHByb2plY3Q/OiB7XHJcblx0XHRpZDogbnVtYmVyO1xyXG5cdFx0c2FsYXJ5OiBudW1iZXI7XHJcblx0XHRwcmVjZW50YWdlPzogbnVtYmVyO1xyXG5cdFx0ZGF0ZTogc3RyaW5nO1xyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmV2ZW51ZSB7XHJcblx0aWQ6IHN0cmluZztcclxuXHRhbW91bnQ6IHN0cmluZztcclxuXHRkYXRlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VjdGlvbiB7XHJcblx0aWQ6IHN0cmluZztcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZXhwZW5zZXM6IEV4cGVuc2VbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFeHBlbnNlIHtcclxuXHRpZDogc3RyaW5nO1xyXG5cdG1hdGVyaWFsTmFtZTogc3RyaW5nO1xyXG5cdHRvdGFsY29zdDogbnVtYmVyO1xyXG5cdGRheTogc3RyaW5nO1xyXG5cdHNlY3Rpb24/OiBudW1iZXI7XHJcblx0ZGF0ZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlIHtcclxuXHR3b3JrZXJzOiBXb3JrZXJbXTtcclxuXHRob21lUHVibGljQmlsbHM6IFByb2plY3RCaWxsW107XHJcblx0aG9tZU9mZmljZUJpbGxzOiBQcm9qZWN0QmlsbFtdO1xyXG5cdHNlYXJjaFN0YXRlOiBcImxvYWRpbmdcIiB8IFwiZW1wdHlcIjtcclxuXHRzZXRIb21lUHVibGljQmlsbHM6IChwcm9qZWN0QmlsbHM6IFByb2plY3RCaWxsW10pID0+IHZvaWQ7XHJcblx0c2V0SG9tZU9mZmljZUJpbGxzOiAocHJvamVjdEJpbGxzOiBQcm9qZWN0QmlsbFtdKSA9PiB2b2lkO1xyXG5cdHNldFdvcmtlcnM6ICh3b3JrZXJzOiBXb3JrZXJbXSkgPT4gdm9pZDtcclxuXHRuZXdXb3JrZXI6ICh3b3JrZXI6IFdvcmtlcikgPT4gdm9pZDtcclxuXHRzZXRzZWFyY2hTdGF0ZTogKHN0YXRlOiBcImVtcHR5XCIgfCBcImxvYWRpbmdcIikgPT4gdm9pZDtcclxufVxyXG5cclxuY29uc3Qgc3RvcmVTbGljZTogU3RhdGVDcmVhdG9yPFxyXG5cdFN0YXRlICYgUHJvamVjdEJpbGwsXHJcblx0W1tcInp1c3RhbmQvZGV2dG9vbHNcIiwgbmV2ZXJdXSxcclxuXHRbXSxcclxuXHRTdGF0ZVxyXG4+ID0gKHNldCkgPT4gKHtcclxuXHRzZXRTZWFyY2hTdGF0ZTogKHN0YXRlKSA9PiBzZXQoKCkgPT4gKHsgc2VhcmNoIH0pKSxcclxuXHR3b3JrZXJzOiBbXSxcclxuXHRob21lUHVibGljQmlsbHM6IFtdLFxyXG5cdGhvbWVPZmZpY2VCaWxsczogW10sXHJcblx0c2VhcmNoU3RhdGU6IFwiZW1wdHlcIixcclxuXHRzZXRIb21lUHVibGljQmlsbHM6IChiaWxscykgPT4gc2V0KCgpID0+ICh7IGhvbWVQdWJsaWNCaWxsczogYmlsbHMgfSkpLFxyXG5cdHNldEhvbWVPZmZpY2VCaWxsczogKGJpbGxzKSA9PiBzZXQoKCkgPT4gKHsgaG9tZU9mZmljZUJpbGxzOiBiaWxscyB9KSksXHJcblx0c2V0V29ya2VyczogKHdvcmtlcnMpID0+IHNldCgoKSA9PiAoeyB3b3JrZXJzOiB3b3JrZXJzIH0pKSxcclxuXHRuZXdXb3JrZXI6ICh3b3JrZXIpID0+XHJcblx0XHRzZXQoKHN0YXRlKSA9PiB7XHJcblx0XHRcdHJldHVybiB7IHdvcmtlcnM6IFsuLi5zdGF0ZS53b3JrZXJzLCB3b3JrZXJdIH07XHJcblx0XHR9KSxcclxufSk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIG5ld1Byb2plY3RCaWxsIHtcclxuXHRpZDogbnVtYmVyO1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRjbGllbnROYW1lOiBzdHJpbmc7XHJcblx0Y2xpZW50QWRkcmVzczogc3RyaW5nO1xyXG5cdG9mZmljZVByZWNlbnRhZ2U6IG51bWJlcjtcclxuXHR3b3JrZXJzOiBXb3JrZXJbXTtcclxuXHRyZXZlbnVlczogUmV2ZW51ZVtdO1xyXG5cdGV4cGVuc2VzOiBFeHBlbnNlW107XHJcblx0c2VjdGlvbnM6IFNlY3Rpb25bXTtcclxuXHRkYXRlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IG5ld1Byb2plY3RCaWxsU2xpY2U6IFN0YXRlQ3JlYXRvcjxcclxuXHRuZXdQcm9qZWN0QmlsbCAmIFN0YXRlLFxyXG5cdFtbXCJ6dXN0YW5kL2RldnRvb2xzXCIsIG5ldmVyXV0sXHJcblx0W10sXHJcblx0bmV3UHJvamVjdEJpbGxcclxuPiA9IChzZXQpID0+ICh7XHJcblx0aWQ6IDAsXHJcblx0b2ZmaWNlUHJlY2VudGFnZTogMCxcclxuXHRuYW1lOiBcIlwiLFxyXG5cdGNsaWVudE5hbWU6IFwiXCIsXHJcblx0Y2xpZW50QWRkcmVzczogXCJcIixcclxuXHRkYXRlOiBcIlwiLFxyXG5cdGV4cGVuc2VzOiBbXSxcclxuXHRyZXZlbnVlczogW10sXHJcblx0c2VjdGlvbnM6IFtdLFxyXG5cdHdvcmtlcnM6IFtdLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VTdG9yZSA9IGNyZWF0ZTxTdGF0ZSAmIG5ld1Byb2plY3RCaWxsPigpKFxyXG5cdGRldnRvb2xzKFxyXG5cdFx0KC4uLmEpID0+ICh7IC4uLm5ld1Byb2plY3RCaWxsU2xpY2UoLi4uYSksIC4uLnN0b3JlU2xpY2UoLi4uYSkgfSksXHJcblx0XHR7XHJcblx0XHRcdG5hbWU6IFwiYXBwLXN0b3JhZ2VcIixcclxuXHRcdH0sXHJcblx0KSxcclxuKTtcclxuIl0sIm5hbWVzIjpbImNyZWF0ZSIsImRldnRvb2xzIiwic3RvcmVTbGljZSIsInNldCIsInNldFNlYXJjaFN0YXRlIiwic3RhdGUiLCJzZWFyY2giLCJ3b3JrZXJzIiwiaG9tZVB1YmxpY0JpbGxzIiwiaG9tZU9mZmljZUJpbGxzIiwic2VhcmNoU3RhdGUiLCJzZXRIb21lUHVibGljQmlsbHMiLCJiaWxscyIsInNldEhvbWVPZmZpY2VCaWxscyIsInNldFdvcmtlcnMiLCJuZXdXb3JrZXIiLCJ3b3JrZXIiLCJuZXdQcm9qZWN0QmlsbFNsaWNlIiwiaWQiLCJvZmZpY2VQcmVjZW50YWdlIiwibmFtZSIsImNsaWVudE5hbWUiLCJjbGllbnRBZGRyZXNzIiwiZGF0ZSIsImV4cGVuc2VzIiwicmV2ZW51ZXMiLCJzZWN0aW9ucyIsInVzZVN0b3JlIiwiYSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./store/index.ts\n"));

/***/ })

});