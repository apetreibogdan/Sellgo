using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace El_Proyecte_Grande.Dtos
{
    public class ResponseLoginDto
    {
        public ResponseLoginDto(string id,string name, string expireAt, string jwttoken, string team, string teamManager, string role)
        {
            Id = id;
            Name = name;
            Expire_at = expireAt;
            Jwttoken = jwttoken;
            Team = team;
            TeamManager = teamManager;
            Role = role;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Expire_at { get; set; }

        public string Jwttoken { get; set; }

        public string Team { get; set; }
        public string TeamManager { get; set; }

        public string Role { get; set; }

    }
}