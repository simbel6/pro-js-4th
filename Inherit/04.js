/**
 * 原型式继承
 * 
 * 原型式继承适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。
 * 属性中包含的引用值会始终在对象间共享
 * ES5 增加了 Object.create()方法将原型式继承规范化了
 */

function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

let person = {
  name: "Nick",
  friends: ["Jane", "Aimee", "Tina"],
};

let anotherPerson = object(person);
anotherPerson.name = "Jay";
anotherPerson.friends.push("Jeff");

let yetAnother = object(person);
yetAnother.name = "Andy";
yetAnother.friends.push("Lee");

let thirdPerson = Object.create(person, {
    name: {
        value: 'Oli'
    }
})
thirdPerson.friends.push('Nash')

console.log(thirdPerson.name)
console.log(person.friends);
