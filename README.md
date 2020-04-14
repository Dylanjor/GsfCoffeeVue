# 秋天的燕子

> 又名：燕子的秋天

 ### 这个项目是前后端分离的项目
* 前端书写：Vue，工具：vsCode
* 后端书写：Abp，工具：vs2019
 ### 此项目是专人专享，样式多出自星巴克

```vue
<vue>
```
> 与后台连接的方法

* 登录
    * 账号（系统给账号 递增）
    * 密码 
* 注册
    * 姓名
    * 密码
    * 生日
    * 是否弃用
    * 是否是vip
* 后台方法
    * 创建后返回id
    * 用id查出numbring
    * 用numbring和密码查询出是否有此人（是否弃用还没用上）
vs2019.net core的版本太低问题

>Dotnet core sdk3.1 runtime 3.1下载地址:

https://dotnet.microsoft.com/download/dotnet-core/3.1

> 数据库迁移 EF下的EF文件夹

```c#
public DbSet<UserTable> UserTable { get; set; }
```

1、Add-Migration 表名

2、update-database 

```c#
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using GsfCoffee.CoffeeUser;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GsfCoffee.Coffee
{
    public class GsfInitAppService: GsfCoffeeAppServiceBase,IGsfInitAppService
    {
        private readonly IRepository<UserTable> _repository;
        public GsfInitAppService(IRepository<UserTable> repository) {
            _repository = repository;
        }

        int IGsfInitAppService.Main { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        [HttpPost]
        /// <summary>
        /// 注册信息
        /// </summary>
        public async Task Register(UserTable _userTable)
        {
            var usertable = ObjectMapper.Map<UserTable>(_userTable);
            await _repository.InsertAsync(usertable);
        }
        /// <summary>
        /// 查询信息 登录
        /// </summary>
        /// <param name="userid">用户名</param>
        /// <param name="pwd">用户密码</param>
        /// <returns></returns>
        public async Task<ListResultDto<UserTable>> Login(string userid,string pwd)
        {
            var usertable = _repository
                .GetAll()
                .Where(c=>c.Name == userid && c.PassWord == pwd);
            return new ListResultDto<UserTable>(ObjectMapper.Map<List<UserTable>>(usertable));
        }
    }
}

    


//接口 也需要引用IApplicationService
public interface IGsfInitAppService: IApplicationService
    {
       int Main { get; set; }
    }
    
```

# VS2019 无法连接到Web服务器“IIS Express”

> 解决方案：删除掉项目根文件夹下的***隐藏***文件.vs和.Git

> 跨域问题

>目前的解决方案：
项目中的appsetting.json文件

```c#
{
  "ConnectionStrings": {
    "Default": "Server=106.15.75.186; Database=GsfCoffeeDb; User=sa; Password=Dlj0622;"
  },
  "App": {
    "ServerRootAddress": "http://localhost:21021/",
    "ClientRootAddress": "http://localhost:4200/",
    "CorsOrigins": "http://localhost:4200,http://localhost:8080,http://localhost:8081,http://localhost:3000,http://106.15.75.186:8080"
  },
  "Authentication": {
    "JwtBearer": {
      "IsEnabled": "true",
      "SecurityKey": "GsfCoffee_C421AAEE0D114E9C",
      "Issuer": "GsfCoffee",
      "Audience": "GsfCoffee"
    }
  }
}
```

> 将发布后的appsetting.json文件中修改
"ServerRootAddress": "http://localhost:21021/",
将"http://localhost:21021/"修改为"http://106.15.75.186:8080/"
然后网站绑定的是两个网址106.15.75.186:8080/，172.17.24.86:8080/

> 数据库创建触发器 修改数据时自动修改updatetime为当前时间

```sql
--自动修改 “修改时间”
Create TRIGGER [dbo].[update_UserTable_trigger]
 ON [dbo].[UserTable]
 after update
 as 
 declare @id int
 begin
 update UserTable set UpdateTime = SYSDATETIME() WHERE ID IN (SELECT DISTINCT ID FROM inserted)
 
 --修改numbering最大值
 Create TRIGGER [dbo].[number]
on [dbo].[UserTable]
after insert
as
declare @num int
begin
 select @num=max(numbering) from UserTable
 update UserTable set numbering=@num+1
 where ID in (select ID from inserted)
END
```

### 在iis上vs2019的Web部署

网站来源链接：https://www.cnblogs.com/ancm/p/11110200.html
* 1、服务器上下载Web Deploy
网址：https://www.iis.net/downloads/microsoft/web-deploy
.net core sdk 以及runtime 需要更新到3.1
https://dotnet.microsoft.com/download/dotnet-core
* 2、安装完成后
* 3、打开服务web management service，iis管理器权限添加上管理员的名字
* 4、将防火墙打开一个入站规则端口：8172在阿里云后台管理控制台上也要打开端口8172
* 5、右键站点-->部署-->启用web deploy发布
* 6、vs2019 web发布

> 验证连接出现对号就证明连接ok

> 署名：代礼家 
