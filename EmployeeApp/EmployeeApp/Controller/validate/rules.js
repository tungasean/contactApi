$validation = {
    //for validation
    hasInvalid: function (element, selector) {
        if (!element || !element.length) return false;
        var form;
        if (selector) {
            form = element[0].querySelector(selector);
            if (!form) return false;
        } else form = element[0];
        var lst = form.querySelectorAll('[validation]');
        for (var i = 0; i < lst.length; i++) {
            if (lst[i].disabled) continue;
            if (!lst[i].classList.contains('changed')) {
                lst[i].className += ' changed';
            }
            lst[i].updateError();
        }
        var item = form.querySelector('.error');
        if (item) {
            item.focus();
            return true;
        }
        return false;
    },
    resetValidation: function (element, selector) {
        if (!element || !element.length) return;
        var form;
        if (selector) {
            form = element[0].querySelector(selector);
            if (!form) return;
        } else form = element[0];
        var lst = form.querySelectorAll('.changed');
        for (var i = 0; i < lst.length; i++) {
            lst[i].className = lst[i].className.replace(/\s*\bchanged\b/, '');
            lst[i].updateError();
        }
    },
    validation: function (input, rule) {
        //anh.nguyen - rule:
        //required - bat buoc nhap
        //number:m:n - yeu cau nhap so voi toi da m so nguyen va n so thap phan
        //int:m - yeu cau nhap so nguyen, toi da m so
        //schar - khong cho nhap ky tu dac biet
        //
        var str = input === 0 || input ? input.toString() : '';
        var msg = [];
        if (!str) {
            if (rule.indexOf('required') > -1) msg.push($appScope.translation.validation_required);
        } else
            for (var i = 0; i < rule.length; i++) {
                var r = rule[i].split(':');
                var reg;
                switch (r[0]) {
                    case 'number':
                        if (!/^-?[0-9]+(\.[0-9]+)?$/.test(str)) msg.push($appScope.translation.validation_number);
                        if (r[1]) {
                            reg = new RegExp('^-?[^.]{0,' + r[1] + '}(\\..*)?$');
                            if (!reg.test(str)) {
                                if (r[2]) msg.push(String.format($appScope.translation.validation_intLength, r[1]));
                                else msg.push(String.format($appScope.translation.validation_max, r[1]));
                            }
                            if (r[2]) {
                                reg = new RegExp('^[^.]*(\\.[^.]{0,' + r[2] + '})?$');
                                if (!reg.test(str))
                                    msg.push(String.format($appScope.translation.validation_decimalLength, r[2]));
                            }
                        }
                        continue;
                    case 'int':
                        if (!/^(-[0-9])?[0-9]*$/.test(str)) msg.push("Chỉ Nhập Từ 0-9");
                        if (r[1]) {
                            reg = new RegExp('^[^.]{0,' + r[1] + '}$');
                            if (!reg.test(str)) msg.push(String.format($appScope.translation.validation_max, r[1]));
                        }
                        continue;
                    case 'notcontain':
                        if (!str) continue;
                        var reg = '^[^';
                        var valReg = '';
                        for (var i = 0; i < r.length; i++) {
                            if (i === 0) continue;
                            reg += r[i];
                            if (i !== 1) valReg += ',';
                            valReg += r[i];
                        }
                        reg += ']+$';
                        reg = new RegExp(reg, 'i');
                        if (!reg.test(str)) msg.push(String.format($appScope.translation.validation_notcontain, valReg));
                        continue;
                    case '>0':
                        if (/^-|^0+(\.0+)?$/.test(str)) msg.push($appScope.translation.validation_greatThanZero);
                        continue;
                    case '>=0':
                        if (/^-/.test(str)) msg.push($appScope.translation.validation_notLessThanZero);
                        continue;
                    case 'maxvalue':
                        if (Number(str) > Number(r[1])) msg.push(String.format($appScope.translation.validation_maxvalue, r[1]));
                        continue;
                    case 'minvalue':
                        if (Number(str) < Number(r[1])) msg.push(String.format($appScope.translation.validation_minvalue, r[1]));
                        continue;
                    case 'max':
                        reg = new RegExp('^[\\d\\D]{0,' + r[1] + '}$');
                        if (!reg.test(str)) msg.push(String.format($appScope.translation.validation_max, r[1]));
                        continue;
                    case 'min':
                        reg = new RegExp('^[\\d\\D]{' + r[1] + ',}$');
                        if (!reg.test(str)) msg.push(String.format($appScope.translation.validation_min, r[1]));
                        continue;
                    case 'equal':
                        reg = new RegExp('^.{' + r[1] + ',}$');
                        if (str.length !== Number(r[1])) msg.push(String.format($appScope.translation.validation_equal, r[1]));
                        continue;
                    case 'text':
                        if (!/^[A-Za-z]*$/.test(str)) msg.push($appScope.translation.validation_text);
                        continue;
                    case 'alpha':
                        if (!/^[A-Za-z0-9]*$/.test(str)) msg.push($appScope.translation.validation_alpha);
                        continue;
                    case 'date':
                        var m = str.match(/^(\d{2})\/(\d{2})\/((19|20)[0-9]{2})$/);
                        if (m) {
                            if (
                                m[2] > 12 ||
                                (m[2] == 2 ? m[1] > (m[3] % 4 ? 28 : 29) : m[1] > (/[469]|11/.test(m[2]) ? 30 : 31))
                            ) msg.push($appScope.translation.validation_dateInvalid);
                        } else {
                            msg.push($appScope.translation.validation_date);
                        }
                        continue;
                    case 'maxdate':
                        var arr1 = str.match(/\d+/g);
                        var arr2 = r[1].match(/\d+/g);
                        if (arr1 && arr1.length === 3 && arr2 && arr2.length === 3) {
                            if (Number(arr1[2] + arr1[1] + arr1[0]) > Number(arr2[2] + arr2[1] + arr2[0])) msg.push(String.format($appScope.translation.validation_maxdate, r[1]));
                        }
                        continue;
                    case 'email':
                        if (!/^\s*([a-zA-Z0-9_\-\.]{1,100})@([A-Za-z0-9]+(-[A-Za-z0-9]+)?\.)+[A-Za-z]{2,}\s*$/.test(str)) msg.push($appScope.translation.ErroEmail_Format);
                        continue;
                    case 'deny':
                        reg = new RegExp('[' + r[1] + ']');
                        if (reg.test(str)) msg.push(String.format($appScope.translation.validation_deny, r[1]));
                        continue;
                    case 'schar':
                        if (/[~`!@#$%^&*()\-_=+,<>/?\\|{\[}\]'"]/.test(str)) msg.push($appScope.translation.validation_schar);
                        continue;
                    //Ho tro : 0-9 a-z A-Z _ - .
                    case 'alpha_dash':
                        if (!/^[0-9a-zA-Z_\-\.]*$/.test(str)) msg.push($appScope.translation.validation_alpha_dash);
                        continue;
                    //Ho tro : 0-9 a-z A-Z _ - . | space
                    case 'alpha_dash2':
                        if (!/^[0-9a-zA-Z_\-\.\|\s]*$/.test(str)) msg.push($appScope.translation.validation_alpha_dash2);
                        continue;
                    case 'int_Mst': // check validate cho mã số thuế
                        if (!/^[\d-]*$/.test(str)) msg.push($appScope.translation.validation_int_mst);
                        if (r[1]) {
                            reg = new RegExp('^[^.]{0,' + r[1] + '}$');
                            if (!reg.test(str)) msg.push(String.format($appScope.translation.validation_max, r[1]));
                        }
                        continue;
                    case '<0':
                        if (/^[^-]+$/.test(str)) msg.push($appScope.translation.validation_greatnotThanZero);
                    case 'alert':
                        if (r[1]) msg.push(r[1]);

                }
            }
        return msg.length ? '· ' + msg.join('<br />· ') : '';
    }
    //end
}
