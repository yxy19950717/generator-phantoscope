const Generator = require('yeoman-generator');
const process = require('process');
const path = require('path');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const chalk = require('chalk');

const CWD = process.cwd();
const LOG = (color) => {
  return (text) => {
    console.log(chalk[color](text));
  };
};

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  
    this.option('name', {
      type: String,
      desc: "name of this project."
    });

    this.props = {};
  }
  
  initializing() {
    LOG('green')('...[info]初始化huge react项目...');
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'your project name',
        default: /\/([^/]*)$/g.exec(CWD)[1]
      }
    ];
    return this.prompt(prompts).then((anwser) => {
      this.props = anwser;
    });
  }

  writing() {
    const {props} = this;
    const pkg = {
      name: props.name,
      author: this.user.git.name()
    };

    mkdirp('./public');
    mkdirp('./src/mods');

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      pkg
    );
    this.fs.copy(
      this.templatePath('./src/'),
      this.destinationPath('./src/')
    );
    this.fs.copy(
      this.templatePath('./config/'),
      this.destinationPath('./config/')
    );
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    }).then(() => {
      LOG('green')('...[info]项目生成完成...');
    });
  }
}